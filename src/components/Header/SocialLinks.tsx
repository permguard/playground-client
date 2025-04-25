import Link from "next/link";

export const SocialLinks = () => {
  return (
    <>
      <Link
        target="_blank"
        aria-label="Twitter X"
        className="group"
        href={"https://x.com/permguard"}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-6 w-6 fill-slate-400 group-hover:fill-slate-300"
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"></path>
        </svg>
      </Link>
      <Link
        target="_blank"
        aria-label="LinkedIn"
        className="group"
        href="https://www.linkedin.com/showcase/permguard/"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-6 w-6 fill-slate-400 group-hover:fill-slate-300"
        >
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"></path>
        </svg>
      </Link>
      {/* <Link
        target="_blank"
        aria-label="Documentation"
        className="group"
        href="https://www.permguard.com/docs/0.0.x/getting-started/permguard-paradigm/"
      >
        <svg
          fill="currentcolor"
          viewBox="0 0 16 16"
          className="h-6 w-6 fill-slate-400 group-hover:fill-slate-300"
        >
          <path d="M5.5 7a.5.5.0 000 1h5a.5.5.0 000-1zM5 9.5a.5.5.0 01.5-.5h5a.5.5.0 010 1h-5A.5.5.0 015 9.5m0 2a.5.5.0 01.5-.5h2a.5.5.0 010 1h-2a.5.5.0 01-.5-.5"></path>
          <path d="M9.5.0H4A2 2 0 002 2v12a2 2 0 002 2h8a2 2 0 002-2V4.5zm0 1v2A1.5 1.5.0 0011 4.5h2V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z"></path>
        </svg>
      </Link> */}
      <Link
        target="_blank"
        aria-label="GitHub"
        className="group"
        href="https://github.com/permguard/permguard"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-6 w-6 fill-slate-400 group-hover:fill-slate-300"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"></path>
        </svg>
      </Link>
    </>
  );
};
