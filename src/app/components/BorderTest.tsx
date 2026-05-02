// 邊框測試組件 - 用於驗證CSS變量是否正確載入

export function BorderTest() {
  return (
    <div style={{ position: 'fixed', top: 10, right: 10, background: 'white', padding: '20px', border: '2px solid black', zIndex: 9999 }}>
      <h4 style={{ margin: '0 0 10px 0' }}>邊框顏色測試</h4>

      <div style={{ marginBottom: '10px' }}>
        <div style={{
          width: '200px',
          height: '40px',
          borderBottom: '2px solid var(--color-border-dark)',
          marginBottom: '5px'
        }}>
          表頭邊框 (2px dark)
        </div>
        <small>應該是深灰色 #656c75</small>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <div style={{
          width: '200px',
          height: '40px',
          borderBottom: '1px solid var(--color-border-primary)',
          marginBottom: '5px'
        }}>
          數據行邊框 (1px primary)
        </div>
        <small>應該是淺灰色 #e1e4e8</small>
      </div>

      <div>
        <div style={{ width: '200px', height: '40px', borderBottom: '2px solid #656c75' }}>
          直接顏色測試 #656c75
        </div>
      </div>
    </div>
  );
}
