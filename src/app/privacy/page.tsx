import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";
import { getLatestDmg } from "@/lib/release";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles speech, keys, and this website.`,
};

export default async function PrivacyPage() {
  const release = await getLatestDmg();

  return (
    <LegalDoc
      title="Privacy Policy"
      lede="The prompter stays on your Mac. We collect as little as a one-person shop can."
      release={release}
    >
      <h2>Who we are</h2>
      <p>
        {site.name} is made by {site.author}, an individual, under the {site.brand}{" "}
        brand. This policy covers the macOS app and this marketing site.
      </p>

      <h2>What the app can use</h2>
      <p>
        Core prompting does not require an account. Optional features may use
        the microphone, camera, or speech services only after you choose to
        turn them on.
      </p>
      <ul>
        <li>Microphone: listen and transcript, only with your intent.</li>
        <li>Camera: optional recording, only with your intent.</li>
        <li>
          API keys you provide are stored in the macOS Keychain on your device.
        </li>
        <li>Script notes and recordings stay local unless you export them.</li>
      </ul>

      <h2>What we do not do</h2>
      <p>
        We do not require a {site.name} account for the prompter. We do not
        sell personal information. We do not run ads on this site.
      </p>

      <h2>This website</h2>
      <p>
        This site does not set tracking cookies by default. If analytics are
        added later, they will be named on the{" "}
        <a href="/cookies">Cookie Policy</a> first.
      </p>

      <h2>Contact</h2>
      <p>
        Questions:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> ({site.emailNote}) or
        an issue on the{" "}
        <a href={site.githubAppRepo}>app repository</a> if you have access.
      </p>
    </LegalDoc>
  );
}
