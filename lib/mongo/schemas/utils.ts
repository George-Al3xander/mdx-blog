export const postSchemaBlueprint = {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  originalSource: {
    type: {
      title: String,
      href: String,
    },
    required: false,
  },
}
