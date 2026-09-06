import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { getLatestDmg } from "@/lib/release";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using ${site.name} and this site.`,
};

export default async function TermsPage() {
  const release = await getLatestDmg();

  return (
    <LegalDoc
      title="Terms of Use"
      lede="Short rules for a local Mac app and this marketing site."
      release={release}
    >
      <h2>The product</h2>
      <p>
        {site.name} is an indie macOS app by {site.author}. These terms cover
        the app, downloadable builds, and this website. By using either, you
        agree to them.
      </p>

      <h2>License</h2>
      <p>
        We grant you a personal, non-exclusive license to install the Mac build
        on computers you own or control. You may not resell the binary as your
        own product, strip the name, or use the {site.brand} marks to imply
        we endorse another tool.
      </p>

      <h2>Your content</h2>
      <p>
        Scripts, transcripts, and recordings you create stay yours. You are
        responsible for having the right to record a room and for any third-party
        APIs you connect with your own keys.
      </p>

      <h2>No warranty</h2>
      <p>
        The app and site are provided as is. Live demos fail for many reasons.
        We are not liable for a missed line, a bad take, or lost notes. To the
        extent the law allows, our liability is limited to the amount you paid
        us for the app in the last twelve months, which may be zero.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not use {site.name} to break the law, to record people without
        required consent, or to attack other systems. Do not scrape this site
        in a way that knocks it over.
      </p>

      <h2>Changes</h2>
      <p>
        We may update the app and these terms. The effective date at the top
        is the current version. Continued use after a change means you accept
        the new terms.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a> ({site.emailNote}).
      </p>
    </LegalDoc>
  );
}
