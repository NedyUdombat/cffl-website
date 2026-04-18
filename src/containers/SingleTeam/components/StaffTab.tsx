"use client";

import { Globe, Mail, MapPin, Phone, UserCircle } from "lucide-react";
import type { CoachData } from "../types";
import { SectionHeading } from "./SectionHeading";

export function StaffTab({
  headCoach,
  assistantCoach,
  primaryColor,
  email,
  phone,
  url,
  country,
  state,
}: {
  headCoach: CoachData;
  assistantCoach: CoachData;
  primaryColor: string;
  email?: string;
  phone?: string;
  url?: string;
  country?: string;
  state?: string;
}) {
  const coaches = [headCoach, assistantCoach];

  const infoItems = [
    { icon: Mail, label: "Email", value: email },
    { icon: Phone, label: "Phone", value: phone },
    { icon: Globe, label: "Website", value: url },
    {
      icon: MapPin,
      label: "Location",
      value: [state, country].filter(Boolean).join(", ") || undefined,
    },
  ].filter((item) => Boolean(item.value));

  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SectionHeading primaryColor={primaryColor}>Coaching Staff</SectionHeading>
        </div>

        {/* ── Coach cards ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {coaches.map((coach) => (
            <div
              key={coach.title}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-5"
              style={{ borderLeft: `4px solid ${primaryColor}` }}
            >
              <div
                className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}18` }}
              >
                <UserCircle size={28} style={{ color: primaryColor }} />
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-inter">
                  {coach.title}
                </p>
                <h3 className="font-inter font-semibold text-xl text-gray-900 leading-tight mt-0.5">
                  {coach.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ── Team info strip ───────────────────────────────────────────── */}
        {infoItems.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-6">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-inter mb-4">
              Team Contact & Info
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {infoItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={14} className="text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider font-inter leading-none">
                      {label}
                    </p>
                    <p className="font-inter font-semibold text-sm text-gray-900 mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
