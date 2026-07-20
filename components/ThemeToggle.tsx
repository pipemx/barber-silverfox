"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/**
 * Botón para alternar entre modo claro y oscuro. `fixedLight` se usa cuando
 * el botón vive sobre el video del hero (navbar transparente, sin scroll):
 * ahí usa colores fijos y claros en vez de reaccionar al tema, porque el
 * fondo detrás siempre es oscuro sin importar el tema elegido para el sitio.
 *
 * IMPORTANTE: este componente NO trae su propia clase de display (flex/
 * hidden/inline-flex). El `className` del caller debe incluirla siempre
 * (ej. "hidden sm:flex" o "flex sm:hidden"), porque una clase de display
 * fija aquí competiría en especificidad con la de visibilidad responsiva
 * del caller y una de las dos "ganaría" de forma impredecible.
 */
export function ThemeToggle({
  className = "",
  fixedLight = false,
}: {
  className?: string;
  fixedLight?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage puede no estar disponible (modo privado); el toggle
      // sigue funcionando durante la sesión aunque no se recuerde luego.
    }
  };

  const colorCls = fixedLight
    ? "border-[#4cc3ff]/30 text-[#93a3bc] hover:text-[#9fe6ff] hover:border-[#4cc3ff]/60"
    : "border-line text-stone-muted hover:text-ice hover:border-ice/50";

  // Evita un mismatch de hidratación: el tema real solo se conoce en el
  // cliente (localStorage), así que hasta montar mostramos un placeholder
  // del mismo tamaño en vez de adivinar el icono.
  if (!mounted) {
    return (
      <span
        className={`w-10 h-10 rounded-full border border-transparent ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      className={`w-10 h-10 rounded-full border items-center justify-center cursor-pointer transition-colors duration-300 ${colorCls} ${className}`}
    >
      {theme === "light" ? (
        <Moon className="w-[18px] h-[18px]" aria-hidden="true" />
      ) : (
        <Sun className="w-[18px] h-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}
