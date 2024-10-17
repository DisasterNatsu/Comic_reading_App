const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

async function zipItUp(minAutoScrollDelay = 500) {
  if (window.zipItUpRunning === true) {
    console.log("Currently processing images. Please wait.");
    return;
  }

  if (!window.JSZip) {
    try {
      await import(
        "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
      );
    } catch (ex) {
      console.error("Failed to load JSZip.");
      console.error(ex);
      throw ex;
    }
  }

  if (!window.saveAs) {
    try {
      await import(
        "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js"
      );
    } catch (ex) {
      console.warn("Failed to load FileSaver. Continuing anyway.");
    }
  }

  let saving = false;
  const comicName = (
    document.querySelector("div.tools-content .step-topic").textContent ||
    "Unknown"
  ).trim();
  const chapName = (
    document.querySelector("div.tools-content .step-comic").textContent || ""
  ).trim();

  // Chapter number is assumed to be the first numbers in the chapter name.
  let chapNum = (chapName.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g) || []).at(0);
  // If there is no chapter number, just use the milliseconds since the JavaScript epoch
  if (!chapNum) {
    chapNum = new Date().valueOf().toString();
  }

  chapNum = chapNum.padStart(4, "0");

  const imageList = document.querySelector("div.imgList");
  const imgElementMap = {};

  let scrollTargetIdx = 0;
  let currentScrollTargetIdx = 0;
  let autoScrollTimeout = null;
  const autoScrollDelay = () => minAutoScrollDelay + Math.random() * 250;
  const autoScrollBehavior = () => {
    if (scrollTargetIdx > currentScrollTargetIdx) {
      currentScrollTargetIdx++;
      window.scrollTo({
        left: 0,
        top:
          (document.documentElement.scrollHeight /
            imageList.querySelectorAll("img[lazy]").length) *
          currentScrollTargetIdx,
        behavior: "smooth",
      });
    }
    clearTimeout(autoScrollTimeout);
    autoScrollTimeout = setTimeout(autoScrollBehavior, autoScrollDelay());
  };
  autoScrollTimeout = setTimeout(autoScrollBehavior, autoScrollDelay());

  const tryToSaveItAll = async () => {
    const imgPanels = [...imageList.querySelectorAll("img[lazy]")];
    if (imgPanels.every((img) => img.getAttribute("lazy") === "loaded")) {
      clearTimeout(autoScrollTimeout);
      observer.disconnect();

      console.log("Generating zip...");
      // Alright, create the ZIP file
      const zip = new JSZip();
      const folder = zip.folder(comicName).folder(chapNum);
      folder.file("~chapter_name.txt", chapName);
      for (const [idx, img] of Object.entries(imgElementMap)) {
        console.log(`Creating img data ${idx}`);

        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = img.src;
        await new Promise((res) => {
          image.addEventListener("load", res);
        });

        // const parsedURL = new URL(image.src);
        //   const extension = parsedURL.pathname.slice((parsedURL.pathname.lastIndexOf(".") - 1 >>> 0) + 2);

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        const dataUrl = canvas
          .toDataURL(`image/png`)
          .replace(/^data:image\/(png|jpg);base64,/, "");
        folder.file(`${idx.toString().padStart(4, "0")}.png`, dataUrl, {
          base64: true,
        });
      }

      if (!saving) {
        saving = true;
        console.log("Saving zip...");
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `extract_${comicName}_${chapNum}.zip`);
        console.log("Done!~");
        window.zipItUpRunning = false;
        saving = false;
      }
    }
  };

  const observer = new MutationObserver(async (mutations) => {
    // The list of image elements might not be static.
    const imgPanels = [...imageList.querySelectorAll("img[lazy]")];

    for (const mutation of mutations) {
      const idx = imgPanels.indexOf(mutation.target);
      if (idx > -1) {
        if (mutation.target.getAttribute("lazy") === "loaded") {
          console.log(`Image ${idx} of ${imgPanels.length}`);
          imgElementMap[idx] = mutation.target;
          scrollTargetIdx++;
        }
      }
    }

    await tryToSaveItAll();
  });

  observer.observe(imageList, {
    attributes: true,
    attributeFilter: ["lazy"],
    subtree: true,
  });

  const imgPanels = [...imageList.querySelectorAll("img[lazy]")];
  for (let idx = 0; idx < imgPanels.length; idx++) {
    const img = imgPanels[idx];
    if (img.getAttribute("lazy") === "loaded") {
      imgElementMap[idx] = img;
      scrollTargetIdx++;
    }
  }

  await tryToSaveItAll();
}

zipItUp();
