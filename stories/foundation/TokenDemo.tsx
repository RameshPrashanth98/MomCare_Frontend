export function TokenDemo() {
  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold" style={{ color: 'var(--color-on-surface)' }}>
        MomCare Design Tokens
      </h2>

      <section>
        <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--color-on-surface)' }}>
          Colors
        </h3>
        <div className="flex flex-wrap gap-2">
          <div
            className="h-12 w-12 rounded-md"
            style={{ background: 'var(--color-primary)' }}
            title="Primary"
          />
          <div
            className="h-12 w-12 rounded-md"
            style={{ background: 'var(--color-risk-high)' }}
            title="Risk High"
          />
          <div
            className="h-12 w-12 rounded-md"
            style={{ background: 'var(--color-risk-medium)' }}
            title="Risk Medium"
          />
          <div
            className="h-12 w-12 rounded-md"
            style={{ background: 'var(--color-risk-low)' }}
            title="Risk Low"
          />
          <div
            className="h-12 w-12 rounded-md"
            style={{ background: 'var(--color-success)' }}
            title="Success"
          />
          <div
            className="h-12 w-12 rounded-md"
            style={{ background: 'var(--color-warning)' }}
            title="Warning"
          />
          <div
            className="h-12 w-12 rounded-md"
            style={{ background: 'var(--color-error)' }}
            title="Error"
          />
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--color-on-surface)' }}>
          Spacing
        </h3>
        <div className="space-y-1">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <div
              key={size}
              className="text-sm"
              style={{
                padding: `var(--spacing-${size})`,
                background: 'var(--color-primary-light)',
              }}
            >
              spacing-{size}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--color-on-surface)' }}>
          Radius
        </h3>
        <div className="flex gap-4">
          {(['sm', 'md', 'lg', 'full'] as const).map((size) => (
            <div
              key={size}
              className="h-16 w-16 flex items-center justify-center text-xs"
              style={{
                borderRadius: `var(--radius-${size})`,
                background: 'var(--color-border)',
              }}
            >
              {size}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--color-on-surface)' }}>
          Shadows
        </h3>
        <div className="flex gap-4">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div
              key={size}
              className="h-16 w-24 flex items-center justify-center rounded-md text-sm"
              style={{
                background: 'var(--color-surface)',
                boxShadow: `var(--shadow-${size})`,
              }}
            >
              {size}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
