import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { getLatestDmg } from "@/lib/release";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `${site.name} does not set tracking cookies by default.`,
};

export default async function CookiesPage() {
  const release = await getLatestDmg();

  return (
    <LegalDoc
      title="Cookie Policy"
      lede="This site is built to work without tracking cookies."
      release={release}
    >
      <h2>What we use today</h2>
      <p>
        {site.name}&apos;s marketing site does not set analytics or advertising
        cookies. There is no cookie banner because there is nothing to accept.
      </p>
      <p>
        The host (for example Vercel) may set a strictly necessary cookie for
        security, load balancing, or bot protection. Those are not used to
        profile you for ads.
      </p>

      <h2>The Mac app</h2>
      <p>
        The app is not a website. It does not drop browser cookies. Optional
        cloud APIs you connect yourself follow those providers&apos; policies,
        using keys you store in the macOS Keychain.
      </p>

      <h2>If that changes</h2>
      <p>
        If we add analytics later, this page will name the tool, what it
        stores, and how to opt out. We will not hide that behind a generic
        &quot;we value your privacy&quot; line.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a> ({site.emailNote}).
      </p>
    </LegalDoc>
  );
}
