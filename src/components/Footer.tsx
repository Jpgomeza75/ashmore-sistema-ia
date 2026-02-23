import xptnovaLogo from "@/assets/xptnova-light.svg";

const Footer = () => (
  <footer className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border py-2.5">
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 text-xs font-sans text-muted-foreground">
      <span>Presentado por</span>
      <a href="https://xptnova.com" target="_blank" rel="noopener noreferrer">
        <img src={xptnovaLogo} alt="XPT Nova" className="h-4 w-auto opacity-60 hover:opacity-100 transition-opacity" />
      </a>
    </div>
  </footer>
);

export default Footer;
