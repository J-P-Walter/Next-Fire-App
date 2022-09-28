import Link from "next/Link";

export default function Custom404() {
  return (
    <main>
      <h1>404 - Looks like you took a wrong turn somewhere</h1>
      <iframe
        src="https://giphy.com/embed/1EmBoG0IL50VIJLWTs"
        width="480"
        height="270"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <p>
        <a href="https://giphy.com/gifs/republicrecords-superbowl-theweeknd-1EmBoG0IL50VIJLWTs">
          via GIPHY
        </a>
      </p>

      <Link href="/">
        <button className="btn-blue">Go home</button>
      </Link>
    </main>
  );
}
