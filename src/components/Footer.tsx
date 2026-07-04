import { ProfileData } from "@/lib/types";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "./SocialIcons";
import { Heart } from "lucide-react";

interface FooterProps {
  profile: ProfileData;
}

const socialIcons: Record<string, React.ReactNode> = {
  github: <GithubIcon className="w-5 h-5" />,
  linkedin: <LinkedinIcon className="w-5 h-5" />,
  facebook: <FacebookIcon className="w-5 h-5" />,
  instagram: <InstagramIcon className="w-5 h-5" />,
  twitter: <TwitterIcon className="w-5 h-5" />,
};

export default function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 dark:bg-slate-950 light:bg-slate-100 py-8 border-t border-slate-800 light:border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 light:text-slate-500 text-sm">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {profile.socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 light:text-slate-500 hover:text-emerald-400 light:hover:text-emerald-600 transition-colors"
                aria-label={link.platform}
              >
                {socialIcons[link.platform.toLowerCase()] || (
                  <span>{link.platform}</span>
                )}
              </a>
            ))}
          </div>

          <div className="text-slate-500 light:text-slate-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
