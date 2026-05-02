# 表格邊框分析報告

## 問題描述
用戶反饋："Table 裡面的線都是亂七八糟的"

## 當前設置驗證 ✅

### CSS變量定義
```css
--color-border-primary: #e1e4e8;  /* 淺灰色 - 數據行 */
--color-border-dark: #656c75;      /* 深灰色 - 表頭 */
```

### 使用統計
- **表頭邊框**: 10個 `border-[var(--color-border-dark)] border-b-2` (2px)
- **數據行邊框**: 101個 `border-[var(--color-border-primary)] border-b` (1px)

### 設計規範（從Figma截圖）
1. **表頭(Header)**: 底部 2px solid #656c75 ✅
2. **數據行(Rows)**: 底部 1px solid #e1e4e8 ✅

## 可能的問題

### 1. aria-hidden邊框元素
所有邊框都使用 `aria-hidden="true"` 的絕對定位div：
```tsx
<div aria-hidden="true" className="absolute border-[var(--color-border-primary)] border-b border-solid inset-0 pointer-events-none" />
```

這個結構：
- ✅ `absolute` - 絕對定位
- ✅ `inset-0` - 佔滿整個父元素
- ✅ `pointer-events-none` - 不影響點擊
- ⚠️ 可能的問題：如果父元素沒有 `relative` 定位，邊框可能錯位

### 2. 檢查父元素定位

**表頭Cell父元素**:
```tsx
<div className="content-stretch flex items-start pb-[6px] pt-[4px] px-[8px] relative shrink-0 w-[181px]">
```
✅ 包含 `relative`

**數據行Cell父元素**:
```tsx
<div className="content-stretch flex items-start pb-[5px] pt-[4px] px-[8px] relative shrink-0 w-[181px]">
```
✅ 包含 `relative`

### 3. 可能的視覺問題

如果邊框看起來"亂七八糟"，可能是因為：

1. **邊框疊加**: 
   - 表格row之間的邊框可能會疊加
   - 解決：使用 `border-collapse` 或調整邊框位置

2. **顏色對比度不足**:
   - #e1e4e8 在白色背景上可能太淺
   - #656c75 應該很明顯

3. **邊框寬度不一致**:
   - 表頭: 2px ✅
   - 數據: 1px ✅
   - 這是設計意圖，不是bug

## 建議的修復方案

### 方案1: 檢查CSS是否正確載入
確保 `design-tokens.css` 正確導入並且變量生效

### 方案2: 添加debug樣式
暫時將邊框改為明顯的顏色來測試：
```css
--color-border-primary: #ff0000;  /* 紅色測試 */
--color-border-dark: #0000ff;      /* 藍色測試 */
```

### 方案3: 簡化邊框結構
如果問題持續，考慮直接在cell上添加邊框而不是使用絕對定位的div

## 實際渲染檢查項目

□ CSS變量是否正確載入？
□ 邊框顏色是否顯示？
□ 邊框粗細是否正確（表頭2px，數據1px）？
□ 邊框位置是否正確（底部）？
□ 是否有邊框疊加問題？

## 下一步行動

1. 在瀏覽器開發者工具中檢查計算後的樣式
2. 驗證CSS變量是否解析正確
3. 檢查是否有其他CSS覆蓋了邊框樣式
4. 如需要，提供screenshot以進一步診斷
