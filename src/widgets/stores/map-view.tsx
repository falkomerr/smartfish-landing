"use client";

import { cn } from "@/shared/utils";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";

const YMaps = dynamic(
  () => import("react-yandex-maps").then((mod) => mod.YMaps),
  {
    ssr: false,
  }
);

const Map = dynamic(() => import("react-yandex-maps").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      Загрузка карты...
    </div>
  ),
});

declare global {
  interface Window {
    ymaps: any;
  }
}

export interface MapViewProps {
  coordinates: [number, number][];
  center?: [number, number];
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Создаем SVG иконку для пина на основе MapPinIcon
const createPinIconSvg = (): string => {
  // Компактный SVG без лишних пробелов для правильной работы с data URI
  const svg =
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.5C9.81273 1.50248 7.71575 2.37247 6.16911 3.91911C4.62247 5.46575 3.75248 7.56273 3.75 9.75C3.75 16.8094 11.25 22.1409 11.5697 22.3641C11.6958 22.4524 11.846 22.4998 12 22.4998C12.154 22.4998 12.3042 22.4524 12.4303 22.3641C12.75 22.1409 20.25 16.8094 20.25 9.75C20.2475 7.56273 19.3775 5.46575 17.8309 3.91911C16.2843 2.37247 14.1873 1.50248 12 1.5ZM12 6.75C12.5933 6.75 13.1734 6.92595 13.6667 7.25559C14.1601 7.58524 14.5446 8.05377 14.7716 8.60195C14.9987 9.15013 15.0581 9.75333 14.9424 10.3353C14.8266 10.9172 14.5409 11.4518 14.1213 11.8713C13.7018 12.2909 13.1672 12.5766 12.5853 12.6924C12.0033 12.8081 11.4001 12.7487 10.8519 12.5216C10.3038 12.2946 9.83524 11.9101 9.50559 11.4167C9.17595 10.9234 9 10.3433 9 9.75C9 8.95435 9.31607 8.19129 9.87868 7.62868C10.4413 7.06607 11.2044 6.75 12 6.75Z" fill="#333B8F"/></svg>';
  // #region agent log
  fetch("http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "map-view.tsx:39",
      message: "SVG icon created",
      data: {
        svgLength: svg.length,
        svgPreview: svg.substring(0, 100),
        hasFill: svg.includes("fill"),
      },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "run2",
      hypothesisId: "F",
    }),
  }).catch(() => {});
  // #endregion
  return svg;
};

export function MapView({
  coordinates,
  center = [42.8746, 74.5698],
  zoom = 13,
  className,
  style,
}: MapViewProps) {
  const pinIconSvg = useMemo(() => createPinIconSvg(), []);
  const mapRef = useRef<any>(null);
  const placemarksRef = useRef<any[]>([]);

  // #region agent log
  const encodedIconHref = useMemo(() => {
    const encoded =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(pinIconSvg);
    fetch("http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "map-view.tsx:57",
        message: "Icon href encoded",
        data: {
          encodedLength: encoded.length,
          encodedPreview: encoded.substring(0, 150),
          isValidDataUri: encoded.startsWith("data:image/svg+xml"),
        },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run3",
        hypothesisId: "G",
      }),
    }).catch(() => {});
    return encoded;
  }, [pinIconSvg]);
  // #endregion

  // #region agent log
  useEffect(() => {
    fetch("http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "map-view.tsx:52",
        message: "MapView rendered",
        data: {
          coordinatesLength: coordinates?.length,
          coordinates,
          center,
          zoom,
        },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "B",
      }),
    }).catch(() => {});
  }, [coordinates, center, zoom]);
  // #endregion

  // Добавляем пины программно через API Яндекс.Карт
  useEffect(() => {
    if (!mapRef.current || typeof window === "undefined") {
      // #region agent log
      fetch(
        "http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "map-view.tsx:125",
            message: "Skipping placemark creation - no map ref",
            data: {
              hasMapRef: !!mapRef.current,
              hasWindow: typeof window !== "undefined",
            },
            timestamp: Date.now(),
            sessionId: "debug-session",
            runId: "run4",
            hypothesisId: "K",
          }),
        }
      ).catch(() => {});
      // #endregion
      return;
    }

    // Ждем загрузки window.ymaps с повторными попытками
    let attempts = 0;
    const maxAttempts = 20; // Максимум 2 секунды (20 * 100ms)
    let timeoutId: NodeJS.Timeout | null = null;

    const tryAddPlacemarks = () => {
      attempts++;

      if (typeof window === "undefined" || !window.ymaps) {
        // #region agent log
        fetch(
          "http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "map-view.tsx:150",
              message: "Waiting for ymaps",
              data: {
                attempt: attempts,
                hasYmaps: typeof window !== "undefined" && !!window.ymaps,
              },
              timestamp: Date.now(),
              sessionId: "debug-session",
              runId: "run4",
              hypothesisId: "K",
            }),
          }
        ).catch(() => {});
        // #endregion

        if (attempts < maxAttempts && mapRef.current) {
          timeoutId = setTimeout(tryAddPlacemarks, 100);
        }
        return;
      }

      // Удаляем старые пины
      placemarksRef.current.forEach((placemark) => {
        try {
          mapRef.current.geoObjects.remove(placemark);
        } catch (error) {
          // Ignore
        }
      });
      placemarksRef.current = [];

      // Добавляем новые пины
      coordinates.forEach((coord) => {
        try {
          const placemark = new window.ymaps.Placemark(
            coord,
            {},
            {
              iconLayout: "default#image",
              iconImageHref: encodedIconHref,
              iconImageSize: [32, 32],
              iconImageOffset: [-16, -32],
              openBalloonOnClick: false,
              hideIconOnBalloonOpen: false,
              interactivityModel: "default#opaque",
            }
          );
          mapRef.current.geoObjects.add(placemark);
          placemarksRef.current.push(placemark);
          // #region agent log
          fetch(
            "http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                location: "map-view.tsx:195",
                message: "Placemark added programmatically",
                data: { coord, hasPlacemark: !!placemark, attempt: attempts },
                timestamp: Date.now(),
                sessionId: "debug-session",
                runId: "run4",
                hypothesisId: "K",
              }),
            }
          ).catch(() => {});
          // #endregion
        } catch (error) {
          // #region agent log
          fetch(
            "http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                location: "map-view.tsx:210",
                message: "Placemark creation error",
                data: { coord, error: String(error), attempt: attempts },
                timestamp: Date.now(),
                sessionId: "debug-session",
                runId: "run4",
                hypothesisId: "K",
              }),
            }
          ).catch(() => {});
          // #endregion
        }
      });
    };

    tryAddPlacemarks();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [coordinates, encodedIconHref]);

  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "map-view.tsx:175",
        message: "Center change effect",
        data: { hasMapRef: !!mapRef.current, center, zoom },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run3",
        hypothesisId: "I",
      }),
    }).catch(() => {});
    // #endregion
    if (mapRef.current) {
      try {
        mapRef.current.setCenter(center, zoom);
      } catch (error) {
        // #region agent log
        fetch(
          "http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "map-view.tsx:195",
              message: "setCenter error",
              data: { error: String(error) },
              timestamp: Date.now(),
              sessionId: "debug-session",
              runId: "run3",
              hypothesisId: "I",
            }),
          }
        ).catch(() => {});
        // #endregion
      }
    } else {
      // Если mapRef еще не установлен, попробуем через небольшую задержку
      const timeoutId = setTimeout(() => {
        if (mapRef.current) {
          try {
            mapRef.current.setCenter(center, zoom);
          } catch (error) {
            // Ignore
          }
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [center, zoom]);

  return (
    <div className={cn("relative h-full w-full", className)} style={style}>
      <YMaps>
        <Map
          state={{ center, zoom }}
          instanceRef={(instance: any) => {
            // #region agent log
            fetch(
              "http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  location: "map-view.tsx:240",
                  message: "Map instance ref set",
                  data: {
                    hasInstance: !!instance,
                    hasYmaps:
                      typeof window !== "undefined" &&
                      typeof (window as any).ymaps !== "undefined",
                    coordinatesCount: coordinates.length,
                    center,
                    zoom,
                  },
                  timestamp: Date.now(),
                  sessionId: "debug-session",
                  runId: "run3",
                  hypothesisId: "J",
                }),
              }
            ).catch(() => {});
            // #endregion
            mapRef.current = instance;
            // Обновляем центр сразу после установки instance
            if (instance) {
              try {
                instance.setCenter(center, zoom);
                // #region agent log
                setTimeout(() => {
                  fetch(
                    "http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        location: "map-view.tsx:265",
                        message: "Map bounds after setCenter",
                        data: {
                          hasMapRef: !!mapRef.current,
                          hasYmaps:
                            typeof window !== "undefined" &&
                            typeof (window as any).ymaps !== "undefined",
                          center,
                          zoom,
                        },
                        timestamp: Date.now(),
                        sessionId: "debug-session",
                        runId: "run3",
                        hypothesisId: "J",
                      }),
                    }
                  ).catch(() => {});
                }, 500);
                // #endregion
              } catch (error) {
                // #region agent log
                fetch(
                  "http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      location: "map-view.tsx:285",
                      message: "setCenter error in instanceRef",
                      data: { error: String(error) },
                      timestamp: Date.now(),
                      sessionId: "debug-session",
                      runId: "run3",
                      hypothesisId: "J",
                    }),
                  }
                ).catch(() => {});
                // #endregion
              }
            }
          }}
          className="h-full w-full"
          options={{
            suppressMapOpenBlock: true,
          }}
        >
          <div style={{ display: "none" }}>
            <style>
              {`
              .ymaps-2-1-79-balloon {
                display: none !important;
              }
              .ymaps-2-1-79-hint {
                display: none !important;
              }
            `}
            </style>
          </div>
        </Map>
      </YMaps>
    </div>
  );
}
