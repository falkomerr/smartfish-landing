"use client";

import { useIntersectionObserver } from "@/shared/lib/useIntersectionObserver";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { StoreFrontIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/utils";
import { useEffect, useState } from "react";
import { MapView } from "./map-view";

export interface StoresProps {
  className?: string;
  style?: React.CSSProperties;
}

const cities = ["Бишкек", "Кант", "Токмок"] as const;

const storeData = {
  address: "ул.Суеркулова 16/3",
  workingHours: "с 09:00 до 18:30",
  dayOff: "Понедельник",
  contacts: "0501 97 77 73",
};

// Координаты магазинов для каждого города
const storeCoordinates: Record<(typeof cities)[number], [number, number][]> = {
  Бишкек: [
    [42.8746, 74.5698], // Центр города
    [42.882, 74.585], // Северная часть
    [42.867, 74.555], // Южная часть
    [42.875, 74.545], // Западная часть
    [42.885, 74.575], // Восточная часть
    [42.878, 74.592], // Северо-восток
    [42.862, 74.568], // Юго-запад
    [42.888, 74.548], // Северо-запад
    [42.856, 74.588], // Юго-восток
    [42.872, 74.578], // Центральная часть
  ],
  Кант: [
    [42.89, 74.85], // Центр Канта
    [42.895, 74.86],
    [42.885, 74.84],
    [42.892, 74.855],
    [42.888, 74.845],
  ],
  Токмок: [
    [42.84, 75.28], // Центр Токмока
    [42.845, 75.29],
    [42.835, 75.27],
    [42.842, 75.285],
    [42.838, 75.275],
  ],
};

// Центры городов для карты
const cityCenters: Record<(typeof cities)[number], [number, number]> = {
  Бишкек: [42.8746, 74.5698],
  Кант: [42.89, 74.85],
  Токмок: [42.84, 75.28],
};

export function Stores({ className, style }: StoresProps) {
  const [selectedCity, setSelectedCity] =
    useState<(typeof cities)[number]>("Бишкек");
  const [selectedStoreIndex, setSelectedStoreIndex] = useState<number | null>(
    null
  );
  const { elementRef, hasIntersected } = useIntersectionObserver({
    triggerOnce: true,
  });

  const currentCoordinates = storeCoordinates[selectedCity];
  const mapCenter =
    selectedStoreIndex !== null && currentCoordinates[selectedStoreIndex]
      ? currentCoordinates[selectedStoreIndex]
      : cityCenters[selectedCity];

  // #region agent log
  useEffect(() => {
    fetch("http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: "stores/ui.tsx:57",
        message: "City state changed",
        data: {
          selectedCity,
          currentCoordinatesLength: currentCoordinates?.length,
          mapCenter,
        },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "run1",
        hypothesisId: "A",
      }),
    }).catch(() => {});
  }, [selectedCity, currentCoordinates, mapCenter]);
  // #endregion

  return (
    <Container
      ref={elementRef}
      className={cn(
        "flex flex-col animate-on-scroll slide-up",
        hasIntersected ? "visible" : "",
        className
      )}
      style={{
        gap: "clamp(0.833vw, 0.833vw, 0.833vw)",
        ...style,
      }}
    >
      {/* Title */}
      <h1 className="text-title-sm w-fit text-black animate-slide-in-left">
        Магазины
      </h1>

      {/* City Tabs */}
      <div
        className="flex w-fit bg-[#F5F5F5] rounded-full"
        style={{
          gap: "clamp(0.833vw, 0.833vw, 0.833vw)",
          padding: "clamp(0.208vw, 0.208vw, 0.208vw)",
        }}
      >
        {cities.map((city) => {
          return (
            <button
              key={city}
              type="button"
              onClick={() => {
                // #region agent log
                fetch(
                  "http://127.0.0.1:7243/ingest/8deabaa3-ac19-4999-ad91-45459994d393",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      location: "stores/ui.tsx:115",
                      message: "Tab clicked",
                      data: {
                        clickedCity: city,
                        currentSelectedCity: selectedCity,
                      },
                      timestamp: Date.now(),
                      sessionId: "debug-session",
                      runId: "run1",
                      hypothesisId: "A",
                    }),
                  }
                ).catch(() => {});
                // #endregion
                console.log("Clicking city:", city);
                setSelectedCity(city);
                setSelectedStoreIndex(null); // Сбрасываем выбранный магазин при смене города
              }}
              className={cn(
                "font-inter font-medium cursor-pointer transition-colors rounded-full",
                selectedCity === city ? "text-white" : "text-black"
              )}
              style={{
                paddingLeft: "clamp(1.25vw, 1.667vw, 4.167vw)",
                paddingRight: "clamp(1.25vw, 1.667vw, 4.167vw)",
                paddingTop: "clamp(0.625vw, 0.833vw, 2.083vw)",
                paddingBottom: "clamp(0.625vw, 0.833vw, 2.083vw)",
                fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                backgroundColor:
                  selectedCity === city ? "#333B8F" : "transparent",
              }}
            >
              {city}
            </button>
          );
        })}
      </div>

      {/* Store Cards */}
      <div
        className="flex overflow-x-auto scrollbar-hide"
        style={{
          gap: "clamp(0.833vw, 0.833vw, 0.833vw)",
          paddingRight: "clamp(3.125vw, 4.167vw, 10.417vw)",
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <div
              key={index}
              className="flex flex-shrink-0 flex-col bg-[#F1F1F7]"
              style={{
                padding: "clamp(1.25vw, 1.667vw, 4.167vw)",
                gap: "clamp(0.833vw, 0.833vw, 0.833vw)",
                minWidth: "clamp(200px, 20.833vw, 500px)",
                borderRadius: "clamp(1.667vw, 1.667vw, 1.667vw)",
              }}
            >
              <div
                className="flex items-end"
                style={{
                  gap: "clamp(0.417vw, 0.417vw, 0.417vw)",
                }}
              >
                {/* Store Icon */}
                <div
                  className="flex bg-white w-fit items-start"
                  style={{
                    padding: "clamp(0.313vw, 0.313vw, 0.313vw)",
                    width: "clamp(2.083vw, 2.083vw, 2.083vw)",
                    height: "clamp(2.083vw, 2.083vw, 2.083vw)",
                    borderRadius: "clamp(0.417vw, 0.417vw, 0.417vw)",
                  }}
                >
                  <StoreFrontIcon className="size-full" />
                </div>
                <div className="flex flex-col">
                  <span
                    className="font-inter font-semibold text-black"
                    style={{
                      fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                      lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                    }}
                  >
                    Адрес
                  </span>
                  <span
                    className="font-inter text-black"
                    style={{
                      fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                      lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                    }}
                  >
                    {storeData.address}
                  </span>
                </div>
              </div>

              {/* Store Information */}
              <div
                className="flex flex-col"
                style={{
                  gap: "clamp(0.833vw, 0.833vw, 0.833vw)",
                }}
              >
                {/* Address */}

                <div
                  className="flex w-full"
                  style={{
                    gap: "clamp(0.625vw, 0.625vw, 0.625vw)",
                  }}
                >
                  {/* Working Hours */}
                  <div className="flex flex-col">
                    <span
                      className="font-inter font-semibold text-black"
                      style={{
                        fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                        lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                      }}
                    >
                      Режим работы
                    </span>
                    <span
                      className="font-inter text-black"
                      style={{
                        fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                        lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                      }}
                    >
                      {storeData.workingHours}
                    </span>
                  </div>

                  {/* Day Off */}
                  <div className="flex flex-col">
                    <span
                      className="font-inter font-semibold text-black"
                      style={{
                        fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                        lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                      }}
                    >
                      Выходной
                    </span>
                    <span
                      className="font-inter text-black"
                      style={{
                        fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                        lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                      }}
                    >
                      {storeData.dayOff}
                    </span>
                  </div>
                </div>

                {/* Contacts */}
                <div className="flex flex-col">
                  <span
                    className="font-inter font-semibold text-black"
                    style={{
                      fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                      lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                    }}
                  >
                    Контакты
                  </span>
                  <span
                    className="font-inter text-black"
                    style={{
                      fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                      lineHeight: "clamp(0.781vw, 1.042vw, 2.604vw)",
                    }}
                  >
                    {storeData.contacts}
                  </span>
                </div>
              </div>

              {/* Show on Map Button */}
              <Button
                variant="primary"
                className="mt-auto rounded-full text-white"
                onClick={() => setSelectedStoreIndex(index)}
                style={{
                  fontSize: "clamp(0.625vw, 0.833vw, 2.083vw)",
                  paddingLeft: "clamp(0.938vw, 1.25vw, 3.125vw)",
                  paddingRight: "clamp(0.938vw, 1.25vw, 3.125vw)",
                  paddingTop: "clamp(0.469vw, 0.625vw, 1.563vw)",
                  paddingBottom: "clamp(0.469vw, 0.625vw, 1.563vw)",
                }}
              >
                Показать на карте
              </Button>
            </div>
          );
        })}
      </div>

      {/* Map Section */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "clamp(300px, 37.5vw, 600px)",
          marginTop: "clamp(0.833vw, 0.833vw, 0.833vw)",
          borderRadius: "clamp(1.667vw, 1.667vw, 1.667vw)",
        }}
      >
        <MapView
          key={`${selectedCity}-${selectedStoreIndex}`}
          coordinates={currentCoordinates}
          center={mapCenter}
          zoom={selectedStoreIndex !== null ? 16 : 13}
          className="h-full w-full"
        />
      </div>
    </Container>
  );
}
