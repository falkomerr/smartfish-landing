import { Logo } from "@/shared/ui/logo";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      className="relative z-50 h-fit w-full box-border"
      style={{
        backgroundColor: "#009FE3",
        borderRadius: "clamp(1.667vw, 1.667vw, 1.667vw)",
        paddingTop: "clamp(2.5vw, 3.333vw, 8.333vw)",
        paddingBottom: "clamp(2.5vw, 3.333vw, 8.333vw)",
        paddingLeft: "clamp(2.5vw, 3.333vw, 8.333vw)",
        paddingRight: "clamp(2.5vw, 3.333vw, 8.333vw)",
        marginTop: "clamp(3.125vw, 4.167vw, 10.417vw)",
        marginBottom: "clamp(0.833vw, 0.833vw, 0.833vw)",
        maxWidth: "100%",
      }}
    >
      <div
        className="flex w-full h-full items-start justify-between"
        style={{
          gap: "clamp(2.5vw, 3.333vw, 8.333vw)",
        }}
      >
        {/* Левая часть: Логотип и копирайт */}
        <div
          className="flex flex-col items-start justify-between h-full"
          style={{
            gap: "clamp(1.875vw, 2.5vw, 6.25vw)",
          }}
        >
          <div
            style={{
              filter: "brightness(0) invert(1)",
            }}
          >
            <Logo
              style={{
                width: "clamp(6.25vw, 8.333vw, 20.833vw)",
                height: "clamp(6.25vw, 8.333vw, 20.833vw)",
              }}
            />
          </div>
          <p
            className="text-[#66C5EE]"
            style={{
              fontSize: "clamp(0.469vw, 0.625vw, 1.563vw)",
              lineHeight: "clamp(0.625vw, 0.833vw, 2.083vw)",
              maxWidth: "clamp(16.583vw, 23.167vw, 54vw)",
            }}
          >
            © АкваПром. Все права защищены. Использование материалов сайта без
            согласия правообладателя запрещено
          </p>
        </div>

        {/* Правая часть: Колонки и блоки контактов/соцсетей */}
        <div
          className="flex items-start h-full"
          style={{
            gap: "clamp(2.5vw, 3.333vw, 8.333vw)",
          }}
        >
          {/* Колонки: Карта сайта и Категории */}
          <div
            className="flex items-start h-full"
            style={{
              gap: "clamp(3.75vw, 5vw, 12.5vw)",
            }}
          >
            {/* Карта сайта */}
            <div className="flex flex-col h-full justify-start" style={{}}>
              <h3
                className="text-white font-semibold"
                style={{
                  fontSize: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  lineHeight: "clamp(0.938vw, 1.25vw, 3.125vw)",
                  marginBottom: "clamp(0.469vw, 0.625vw, 1.563vw)",
                }}
              >
                Карта сайта
              </h3>
              <nav
                className="flex flex-col"
                style={{
                  gap: "clamp(0.469vw, 0.625vw, 1.563vw)",
                }}
              >
                <Link
                  href="/"
                  className="text-white link-hover"
                  style={{
                    fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                    lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  }}
                >
                  Главная
                </Link>
                <Link
                  href="/catalog"
                  className="text-white link-hover"
                  style={{
                    fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                    lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  }}
                >
                  Каталог
                </Link>
                <Link
                  href="/about"
                  className="text-white link-hover"
                  style={{
                    fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                    lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  }}
                >
                  О нас
                </Link>
                <Link
                  href="/stores"
                  className="text-white link-hover"
                  style={{
                    fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                    lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  }}
                >
                  Магазины
                </Link>
                <Link
                  href="/contacts"
                  className="text-white link-hover"
                  style={{
                    fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                    lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  }}
                >
                  Контакты
                </Link>
              </nav>
            </div>

            {/* Категории */}
            <div className="flex flex-col h-full justify-start" style={{}}>
              <h3
                className="text-white font-semibold"
                style={{
                  fontSize: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  lineHeight: "clamp(0.938vw, 1.25vw, 3.125vw)",
                  marginBottom: "clamp(0.469vw, 0.625vw, 1.563vw)",
                }}
              >
                Категории
              </h3>
              <nav
                className="flex flex-col"
                style={{
                  gap: "clamp(0.469vw, 0.625vw, 1.563vw)",
                }}
              >
                <Link
                  href="/category/vacuum-packed"
                  className="text-white link-hover"
                  style={{
                    fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                    lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  }}
                >
                  Вакуумированные
                </Link>
                <Link
                  href="/category/caviar"
                  className="text-white link-hover"
                  style={{
                    fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                    lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  }}
                >
                  Икры
                </Link>
                <Link
                  href="/category/soup-kits"
                  className="text-white link-hover"
                  style={{
                    fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                    lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  }}
                >
                  Суп наборы
                </Link>
                <Link
                  href="/category/semi-finished"
                  className="text-white link-hover"
                  style={{
                    fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                    lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                  }}
                >
                  Полуфабрикаты
                </Link>
              </nav>
            </div>
          </div>

          {/* Блоки контактов и соцсетей */}
          <div
            className="flex flex-col items-end justify-start h-full"
            style={{
              gap: "clamp(0.938vw, 1.25vw, 3.125vw)",
            }}
          >
            {/* Блок контактов */}
            <div
              className="bg-white"
              style={{
                borderRadius: "clamp(0.833vw, 0.833vw, 0.833vw)",
                padding: "clamp(1.25vw, 1.667vw, 4.167vw)",
                width: "clamp(12.5vw, 16.667vw, 41.667vw)",
                minWidth: "clamp(12.5vw, 16.667vw, 41.667vw)",
              }}
            >
              <p
                className="text-[#7d7d7d] mb-[clamp(0.469vw, 0.625vw, 1.563vw)]"
                style={{
                  fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                  lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                }}
              >
                Мы на связи
              </p>
              <a
                href="tel:+996700700700"
                className="text-black font-bold hover:opacity-80 transition-opacity"
                style={{
                  fontSize: "clamp(1.25vw, 1.667vw, 4.167vw)",
                  lineHeight: "clamp(1.406vw, 1.875vw, 4.688vw)",
                }}
              >
                +996 700 700 700
              </a>
            </div>

            {/* Блок соцсетей */}
            <div
              className="bg-white"
              style={{
                borderRadius: "clamp(0.833vw, 0.833vw, 0.833vw)",
                padding: "clamp(1.25vw, 1.667vw, 4.167vw)",
                width: "clamp(12.5vw, 16.667vw, 41.667vw)",
                minWidth: "clamp(12.5vw, 16.667vw, 41.667vw)",
              }}
            >
              <p
                className="mb-[clamp(0.769vw, 1.042vw, 2.604vw)] text-[#7d7d7d]"
                style={{
                  fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                  lineHeight: "clamp(0.813vw, 1.083vw, 2.708vw)",
                }}
              >
                Мы в соц.сетях
              </p>
              <div
                className="flex items-center justify-start"
                style={{
                  gap: "clamp(0.625vw, 0.833vw, 2.083vw)",
                }}
              >
                {/* Иконки справа налево: Facebook, Instagram, WhatsApp, Telegram */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-hover"
                >
                  <Image
                    src="/socials/facebook.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                    unoptimized
                    style={{
                      width: "clamp(1.25vw, 1.667vw, 4.167vw)",
                      height: "clamp(1.25vw, 1.667vw, 4.167vw)",
                    }}
                  />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-hover"
                >
                  <Image
                    src="/socials/instagram.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                    style={{
                      width: "clamp(1.25vw, 1.667vw, 4.167vw)",
                      height: "clamp(1.25vw, 1.667vw, 4.167vw)",
                    }}
                  />
                </a>
                <a
                  href="https://wa.me/996700700700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-hover"
                >
                  <Image
                    src="/socials/whatsapp.png"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    style={{
                      width: "clamp(1.25vw, 1.667vw, 4.167vw)",
                      height: "clamp(1.25vw, 1.667vw, 4.167vw)",
                    }}
                  />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-hover"
                >
                  <Image
                    src="/socials/telegram.png"
                    alt="Telegram"
                    width={24}
                    height={24}
                    style={{
                      width: "clamp(1.25vw, 1.667vw, 4.167vw)",
                      height: "clamp(1.25vw, 1.667vw, 4.167vw)",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
