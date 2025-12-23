import { Factory } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-glass-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                © 2025 LeanTech - Digital Lean Tools. All rights reserved.
              </p>
            </div>

            {/* Credits with external link */}
            <div
              id="about-us"
              className="text-sm text-muted-foreground"
            >
              Made by{' '}
              <a
                href="https://ahmedabdelazeem.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-foreground/80 transition-colors"
              >
                Ahmed Abdelazeem
              </a>{' '}
              & Asmaa Bahnasy
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
