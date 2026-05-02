# 🔴 表格底線對不齊問題診斷

## 問題描述
表格的底線跟前面後面對不上，線條錯位不連續。

## 根本原因發現 ❌

### Cell結構不一致導致邊框錯位

**第一種結構 (Event time, Hostname, Site name等)**:
```tsx
<div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]">
  <div aria-hidden="true" className="absolute border-[...] inset-0 ..." />
  {/* 內容 */}
</div>
```
- ❌ 問題：padding在外層div上
- ❌ 邊框`inset-0`會被padding影響，導致邊框內縮8px

**第二種結構 (System IP)**:
```tsx
<div className="relative self-stretch shrink-0 w-[99px]">
  <div aria-hidden="true" className="absolute border-[...] inset-0 ..." />
  <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
    {/* 內容 */}
  </div>
</div>
```
- ✅ 正確：padding在內層div上
- ✅ 邊框在外層，佔滿整個寬度，不受padding影響

## 視覺效果

```
錯誤的結構（padding在外層）:
┌────────────────────┐
│  [padding 8px]     │
│  ──────────────    │ <- 邊框被padding內縮
│                    │
└────────────────────┘

正確的結構（padding在內層）:
┌────────────────────┐
│  [padding 8px]     │
├────────────────────┤ <- 邊框佔滿整個寬度
│                    │
└────────────────────┘
```

## 受影響的Cells

需要修復的Cells（padding在外層的）:
- Event time (w-[181px])
- Hostname (w-[104px])
- Site name (w-[121px])
- Event name (w-[189px])
- Details (w-[266px])
- Routes sent (w-[98px])
- Routes received (w-[127px])
- Peers (w-[56px])
- 最後一列的設置按鈕

已正確的Cells（padding在內層的）:
- System IP (w-[99px])

## 解決方案

將所有Cell統一為**padding在內層**的結構：

### 修復前:
```tsx
<div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]" data-name="Cell">
  <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
  <div className="flex-[1_0_0] h-[28px] min-w-px relative">
    {/* 內容 */}
  </div>
</div>
```

### 修復後:
```tsx
<div className="relative shrink-0 w-[181px]" data-name="Cell">
  <div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
  <div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative size-full">
    <div className="flex-[1_0_0] h-[28px] min-w-px relative">
      {/* 內容 */}
    </div>
  </div>
</div>
```

## 修復步驟

1. 移除外層div的padding: `pb-[5px] pt-[4px] px-[8px]`
2. 移除外層div的flex相關class: `content-stretch flex items-start`
3. 添加到內層新div
4. 重複所有受影響的Cells（約100+個實例）
