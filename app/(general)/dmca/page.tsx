import Link from "next/link";
import React from "react";

const DMCA = () => {
  return (
    <>
      <title>DMCA - Disaster Scans</title>
      <div className="mt-7 space-y-4 container">
        <h1 className="text-4xl font-semibold text-center">
          DMCA - Disaster Scans
        </h1>

        <section className="space-y-3">
          <p className="paragraph">
            The Digital Millennium Copyright Act (&ldquo;DMCA&rdquo;) is
            designed to protect content creators from having their work stolen
            and published by other people on the internet.
          </p>
          <p className="paragraph">
            The law specifically targets websites where owners do not know who
            contributed each item of content or that the website is a platform
            for uploading and publishing content.
          </p>
          <p className="paragraph">
            We have the policy to respond to any infringement notice and take
            appropriate action.
          </p>
          <p className="paragraph">
            This Digital Millennium Copyright Act policy applies to the
            &ldquo;https://disasterscans.com&rdquo; website
            (&ldquo;Website&rdquo; or &ldquo;Service&rdquo;) and any of its
            related products and services (collectively, &ldquo;Services&rdquo;)
            and outlines how this Website operator (&ldquo;Operator&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) addresses
            copyright infringement notifications and how you (&ldquo;you&rdquo;
            or &ldquo;your&rdquo;) may submit a copyright infringement
            complaint.
          </p>
          <p className="paragraph">
            Protection of intellectual property is of utmost importance to us
            and we ask our users and their authorized agents to do the same. It
            is our policy to expeditiously respond to clear notifications of
            alleged copyright infringement that comply with the United States
            Digital Millennium Copyright Act (&ldquo;DMCA&rdquo;) of 1998, the
            text of which can be found at the U.S. Copyright Office website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading">
            What to consider before submitting a copyright complaint
          </h2>
          <p className="paragraph">
            Please note that if you are unsure whether the material you are
            reporting is in fact infringing, you may wish to contact an attorney
            before filing a notification with us.
          </p>
          <p className="paragraph">
            The DMCA requires you to provide your personal information in the
            copyright infringement notification. If you are concerned about the
            privacy of your personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading">Notifications of infringement</h2>
          <p className="paragraph">
            If you are a copyright owner or an agent thereof, and you believe
            that any material available on our Services infringes your
            copyrights, then you may submit a written copyright infringement
            notification (&ldquo;Notification&rdquo;) using the contact details
            below pursuant to the DMCA. All such Notifications must comply with
            the DMCA requirements.
          </p>
          <p className="paragraph">
            Filing a DMCA complaint is the start of a pre-defined legal process.
            Your complaint will be reviewed for accuracy, validity, and
            completeness. If your complaint has satisfied these requirements,
            our response may include the removal or restriction of access to
            allegedly infringing material.
          </p>
          <p className="paragraph">
            If we remove or restrict access to materials or terminate an account
            in response to a Notification of alleged infringement, we will make
            a good faith effort to contact the affected user with information
            concerning the removal or restriction of access.
          </p>
          <p className="paragraph">
            Not with standing anything to the contrary contained in any portion
            of this Policy, the Operator reserves the right to take no action
            upon receipt of a DMCA copyright infringement notification if it
            fails to comply with all the requirements of the DMCA for such
            notifications.
          </p>
          <p className="paragraph">
            The process described in this Policy does not limit our ability to
            pursue any other remedies we may have to address suspected
            infringement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading">Changes and amendments</h2>
          <p className="paragraph">
            We reserve the right to modify this Policy or its terms related to
            the Website and Services at any time at our discretion. When we do,
            we will post a notification on the main page of the Website, send
            you an email to notify you. We may also provide notice to you in
            other ways at our discretion, such as through the contact
            information you have provided.
          </p>
          <p className="paragraph">
            An updated version of this Policy will be effective immediately upon
            the posting of the revised Policy unless otherwise specified. Your
            continued use of the Website and Services after the effective date
            of the revised Policy (or such other act specified at that time)
            will constitute your consent to those changes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="heading">Reporting copyright infringement</h2>
          <p className="paragraph">
            If you would like to notify us of the infringing material or
            activity, we encourage you to contact us via email address given
            below.
          </p>
          <ul className="space-y-2">
            <li className="paragraph">
              <span className="font-semibold">Email:</span>{" "}
              <Link
                href="mailto:martialscans@gmail.com"
                className="dark:hover:text-accentColor hover:text-accentColorLight"
              >
                martialscans@gmail.com
              </Link>
            </li>
            <li className="paragraph">
              <span className="font-semibold">Note:</span> Please allow 4-5
              business days for an email response.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default DMCA;
