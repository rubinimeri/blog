function Footer() {
  return (
    <footer className="flex items-center justify-evenly gap-10 p-4 border-2">
      <img width={100} src="/logo/logo-light-sm.png" alt="logo" />
      <div className="flex items-center gap-1">
        <a href="https://github.com/rubinimeri" target="_blank">
          <img src="/github-icon.png" alt="github icon" />
        </a>
        <p className="font-light text-gray-500">© 2024 Rubin Imeri</p>
      </div>
    </footer>
  );
}

export default Footer;
