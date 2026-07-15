"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Roadsafe Traffic home">
          <Image
            src="/images/roadsafe-logo.png"
            alt="Roadsafe Traffic"
            width={388}
            height={78}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active =
              item.href === "/products"
                ? pathname.startsWith("/products")
                : pathname === item.href;
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link className="header-quote" href="/request-a-quote">
          Request a quote
          <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? "mobile-nav--open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navigation.map((item, index) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            <span>0{index + 1}</span>
            {item.label}
          </Link>
        ))}
        <Link className="mobile-quote" href="/request-a-quote" onClick={() => setOpen(false)}>
          Request a quote
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
