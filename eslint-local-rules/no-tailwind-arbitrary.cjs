// Blocks arbitrary Tailwind values like bg-[#ff0000], p-[20px], w-[100px]
// Allows CSS variable references like bg-[var(--color-primary)]
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow arbitrary Tailwind CSS values — use design tokens instead',
    },
    messages: {
      noArbitrary:
        'Arbitrary Tailwind value "{{value}}" is banned. Use a design token from @theme instead.',
    },
    schema: [],
  },
  create(context) {
    function checkForArbitrary(value, node) {
      if (typeof value !== 'string') return
      // Match class-[value] patterns but allow [var(--*)]
      const arbitraryPattern = /(?:^|\s)[\w-]+\[(?!var\()([^\]]+)\]/g
      let match
      while ((match = arbitraryPattern.exec(value)) !== null) {
        context.report({
          node,
          messageId: 'noArbitrary',
          data: { value: match[0].trim() },
        })
      }
    }

    return {
      JSXAttribute(node) {
        if (node.name.name !== 'className') return
        // String literal className="..."
        if (
          node.value &&
          node.value.type === 'Literal' &&
          typeof node.value.value === 'string'
        ) {
          checkForArbitrary(node.value.value, node)
        }
      },
    }
  },
}
