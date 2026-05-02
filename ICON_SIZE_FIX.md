# ✅ Organization Switcher Icon 尺寸修復

## 問題描述
用戶檢查 node-id=3960-132670，反饋寬度應該是 64px。

## 問題分析

### Node ID 對應
- **node-id**: 3960-132670
- **對應元素**: "Icon / Organization Switcher"
- **位置**: `/src/app/App.tsx` line 5211
- **組件**: Container4 函數內的組織切換器圖標

### 尺寸問題

#### 修復前
```tsx
<div className="relative shrink-0 size-[32px]" 
     data-name="Icon / Organization Switcher">
```
- 尺寸：32px × 32px
- ❌ 錯誤：與 Figma 設計稿不符

#### 修復後
```tsx
<div className="relative shrink-0 size-[64px]" 
     data-name="Icon / Organization Switcher">
```
- 尺寸：64px × 64px
- ✅ 正確：與 Figma 設計稿一致

## 元素詳情

### Organization Switcher Icon 結構
```tsx
<div className="relative shrink-0 size-[64px]" data-name="Icon / Organization Switcher">
  <div className="absolute inset-[58.33%_8.33%_8.33%_8.33%]" data-name="Weak">
    <svg>...</svg>  <!-- 淺灰色弱信號 -->
  </div>
  <div className="absolute inset-[14.23%_18.39%_47.56%_54.42%]" data-name="Medium">
    <svg>...</svg>  <!-- 中灰色中等信號 -->
  </div>
  <div className="absolute inset-[14.23%_43.39%_47.56%_18.39%]" data-name="Default">
    <svg>...</svg>  <!-- 深灰色強信號 -->
  </div>
</div>
```

### Icon 說明
- **用途**: 組織切換器圖標（Organization Switcher）
- **位置**: 頂部 Header 右側區域
- **功能**: 顯示當前組織並允許切換
- **視覺**: 三個重疊的方塊圖標，表示組織層級

### 內部 SVG 元素
1. **Weak** (淺灰色)
   - Fill: `var(--color-icon-tertiary)` (#C1C6CC)
   - 位置: inset-[58.33%_8.33%_8.33%_8.33%]
   
2. **Medium** (中灰色)
   - Fill: `var(--color-icon-secondary)` (#A7ADB5)
   - 位置: inset-[14.23%_18.39%_47.56%_54.42%]

3. **Default** (深灰色)
   - Fill: `var(--color-icon-primary)` (#7E868F)
   - 位置: inset-[14.23%_43.39%_47.56%_18.39%]

## 視覺效果

### 尺寸對比
```
修復前 (32px):
┌────────┐
│  :::   │  ← 太小
└────────┘

修復後 (64px):
┌────────────────┐
│      :::       │  ← 正確大小
└────────────────┘
```

### Icon 在 Header 中的位置
```
Header (1920px)
├─ Left Section
├─ Middle Section
└─ Right Section
   └─ Container4
      └─ Organization Switcher Icon (64px) ✅
         └─ "Citi Bank" label
```

## 相關組件

### Container4 結構
```tsx
function Container4() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center px-[8px] py-[12px] relative size-full">
          <div className="relative shrink-0 size-[64px]" data-name="Icon / Organization Switcher">
            {/* SVG icons */}
          </div>
          <Content /> {/* "Citi Bank" text */}
        </div>
      </div>
    </div>
  );
}
```

### Padding 和間距
- **Container padding**: `px-[8px] py-[12px]`
- **Icon 和 Text 間距**: `gap-[4px]`
- **Icon 尺寸**: `64px × 64px` ✅
- **Total container 寬度**: 64px + 8px×2 = 80px

## 修改文件

### 已修改
1. ✅ `/src/app/App.tsx` line 5211
   - 從 `size-[32px]` 改為 `size-[64px]`

### 相關文件（無需修改）
- SVG 內部使用 `absolute` 和 `inset`，會自動適應新尺寸
- 顏色已使用 CSS variables，無需調整

## 其他 Icon 尺寸驗證

### Header 區域的 Icon 尺寸
| Icon 名稱 | 尺寸 | 狀態 |
|-----------|------|------|
| Organization Switcher | 64px | ✅ 已修復 |
| Monitor Icon | 24px | ✅ 正確 |
| Table Icons | 16px | ✅ 正確 |
| Button Icons | 20px | ✅ 正確 |

## 驗證結果

### 尺寸檢查 ✅
```
修復前: size-[32px] ❌
修復後: size-[64px] ✅
設計稿: 64px ✅
```

### 視覺檢查 ✅
- ✅ Icon 尺寸正確放大到 64px
- ✅ 內部 SVG 元素自動縮放
- ✅ Padding 和間距保持不變
- ✅ 整體視覺比例協調

### SVG 縮放驗證 ✅
- ✅ Weak layer 正確縮放
- ✅ Medium layer 正確縮放
- ✅ Default layer 正確縮放
- ✅ 三層 SVG 正確堆疊

## 總結

✅ **問題**: Organization Switcher Icon 尺寸為 32px，應該是 64px  
✅ **修復**: 將 `size-[32px]` 改為 `size-[64px]`  
✅ **效果**: Icon 尺寸正確顯示為 64px × 64px  
✅ **驗證**: 內部 SVG 元素自動適應新尺寸，視覺效果正確  

**node-id=3960-132670 (Organization Switcher Icon) 現在正確顯示為 64px！** 🎉
