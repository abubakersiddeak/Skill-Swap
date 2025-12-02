import { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";

export default function ErrorPage() {
  const codeRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      codeRef.current,
      { opacity: 0, y: -80, rotation: -10 },
      { opacity: 1, y: 0, rotation: 0, duration: 1, ease: "power4.out" }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, delay: 0.4, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      btnRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, delay: 0.7, duration: 0.8, ease: "back.out(1.7)" }
    );

    gsap.to(orb1Ref.current, {
      y: -20,
      x: 15,
      repeat: -1,
      yoyo: true,
      duration: 6,
      ease: "sine.inOut",
    });
    gsap.to(orb2Ref.current, {
      y: 15,
      x: -20,
      repeat: -1,
      yoyo: true,
      duration: 8,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-white text-gray-900 overflow-hidden px-4">
      <div
        ref={orb1Ref}
        className="absolute w-72 h-72 bg-blue-200 rounded-full blur-3xl top-20 left-10 opacity-40"
      />
      <div
        ref={orb2Ref}
        className="absolute w-60 h-60 bg-pink-200 rounded-full blur-3xl bottom-20 right-10 opacity-30"
      />

      <h1
        ref={codeRef}
        className="text-[10rem] md:text-[12rem] font-extrabold text-gray-900 drop-shadow-md"
      >
        404
      </h1>

      <p
        ref={textRef}
        className="text-lg md:text-2xl text-gray-600 mt-4 mb-8 text-center max-w-lg"
      >
        Oops! The page you are looking for doesn’t exist. It might have been
        moved or deleted.
      </p>

      <Link
        ref={btnRef}
        to="/"
        className="px-8 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
}
