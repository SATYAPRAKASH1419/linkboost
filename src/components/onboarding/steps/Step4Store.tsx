'use client'

import React from 'react'
import { StoreDocItem } from '@/lib/types/onboarding'
import {
  DocumentIcon,
  CalendarIcon,
  ProductIcon,
  AffiliateIcon,
  ShareIcon,
} from '../BrandIcons'

export interface PresetItem {
  type: StoreDocItem['type']
  title: string
  price?: string
  label: string
}

interface Step4StoreProps {
  storeItems: StoreDocItem[]
  newItemType: StoreDocItem['type']
  setNewItemType: (t: StoreDocItem['type']) => void
  newItemTitle: string
  setNewItemTitle: (t: string) => void
  newItemUrl: string
  setNewItemUrl: (u: string) => void
  newItemPrice: string
  setNewItemPrice: (p: string) => void
  presets: PresetItem[]
  onApplyPreset: (p: PresetItem) => void
  onAddItem: () => void
  onRemoveItem: (id: string) => void
  onFinish: () => void
  onPrev: () => void
  isSubmitting: boolean
}

function getPresetIcon(type: StoreDocItem['type']) {
  switch (type) {
    case 'document':
      return <DocumentIcon className="w-4 h-4 text-[#E23744] shrink-0" />
    case 'service':
      return <CalendarIcon className="w-4 h-4 text-[#E23744] shrink-0" />
    case 'product':
      return <ProductIcon className="w-4 h-4 text-[#E23744] shrink-0" />
    case 'affiliate':
      return <AffiliateIcon className="w-4 h-4 text-[#E23744] shrink-0" />
    default:
      return <ShareIcon className="w-4 h-4 text-[#E23744] shrink-0" />
  }
}

export function Step4Store({
  storeItems,
  newItemType,
  setNewItemType,
  newItemTitle,
  setNewItemTitle,
  newItemUrl,
  setNewItemUrl,
  newItemPrice,
  setNewItemPrice,
  presets,
  onApplyPreset,
  onAddItem,
  onRemoveItem,
  onFinish,
  onPrev,
  isSubmitting,
}: Step4StoreProps) {
  return (
    <div className="space-y-3.5 animate-slide-down-fade">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
            Featured Store & Documents
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
            Highlight products, portfolios, booking links, or guides.
          </p>
        </div>
        <button
          type="button"
          onClick={onFinish}
          disabled={isSubmitting}
          className="text-xs font-semibold text-zinc-400 hover:text-zinc-700 underline underline-offset-4 cursor-pointer"
        >
          Skip & Launch
        </button>
      </div>

      {/* Starter Templates (Using crisp SVGs) */}
      <div>
        <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
          Starter Presets
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {presets.map((preset) => (
            <button
              key={preset.title}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className="p-2 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300 text-left text-xs text-zinc-700 transition cursor-pointer active:scale-[0.96] flex items-start gap-2"
            >
              <div className="p-1 rounded-md bg-white border border-zinc-200 mt-0.5">
                {getPresetIcon(preset.type)}
              </div>
              <div className="truncate">
                <p className="font-semibold text-xs truncate">{preset.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-zinc-200/70 text-zinc-600">
                    {preset.type}
                  </span>
                  {preset.price && (
                    <span className="text-[10px] font-bold text-emerald-600">
                      {preset.price}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Item Input Box */}
      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
        <div className="flex gap-1.5">
          {(['product', 'document', 'affiliate', 'service'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setNewItemType(type)}
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize transition cursor-pointer ${
                newItemType === type
                  ? 'bg-[#E23744] text-white shadow-2xs'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <input
            type="text"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder="Title (e.g. 2026 UI Kit, Resume PDF)"
            className="h-8.5 px-3 rounded-lg border border-zinc-200 bg-white text-xs text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-[#E23744]"
          />
          <input
            type="url"
            value={newItemUrl}
            onChange={(e) => setNewItemUrl(e.target.value)}
            placeholder="Destination URL (drive, gumroad, site)"
            className="h-8.5 px-3 rounded-lg border border-zinc-200 bg-white text-xs text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-[#E23744]"
          />
        </div>

        <div className="flex gap-1.5">
          <input
            type="text"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            placeholder="Price or tag (e.g. $19, Free)"
            className="w-32 h-8.5 px-3 rounded-lg border border-zinc-200 bg-white text-xs text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-[#E23744]"
          />
          <button
            type="button"
            onClick={onAddItem}
            disabled={!newItemTitle.trim() || !newItemUrl.trim()}
            className="flex-1 h-8.5 rounded-lg bg-zinc-900 hover:bg-black active:scale-[0.96] text-white text-xs font-semibold disabled:opacity-40 cursor-pointer flex items-center justify-center transition"
          >
            + Add to List
          </button>
        </div>
      </div>

      {/* Added Items List */}
      {storeItems.length > 0 && (
        <div className="space-y-1">
          <div className="space-y-1 max-h-20 overflow-y-auto pr-1">
            {storeItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-lg border border-zinc-200 bg-white text-xs shadow-2xs"
              >
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="capitalize px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600 font-mono text-[9px]">
                    {item.type}
                  </span>
                  <span className="font-semibold text-zinc-800 text-[11px] truncate">{item.title}</span>
                  {item.price && (
                    <span className="text-emerald-600 font-medium text-[10px]">
                      {item.price}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-zinc-400 hover:text-red-500 text-xs ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onPrev}
          className="px-3.5 h-10 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onFinish}
          disabled={isSubmitting}
          className="flex-1 h-10 rounded-xl bg-[#E23744] hover:bg-[#CB202D] active:scale-[0.96] text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-[#E23744]/25 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Saving profile...</span>
            </>
          ) : (
            <>
              <span>Complete & Launch</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
