export function AppErrorFallback() {
  return (
    <main className="app-fallback" role="alert">
      <h1>Не удалось отобразить страницу</h1>
      <p>Попробуйте загрузить её ещё раз.</p>
      <button
        type="button"
        onClick={() => {
          window.location.reload()
        }}
      >
        Перезагрузить страницу
      </button>
    </main>
  )
}
