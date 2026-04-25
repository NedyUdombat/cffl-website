export default {
  name: "news",
  title: "News",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      hidden: ({ parent }) => parent?.type === "external",
    },

    {
      name: "type",
      title: "Article Type",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "external",
    },

    {
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "external",
    },
    {
      name: "source",
      type: "string",
      hidden: ({ parent }) => parent?.type !== "external",
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
    {
      name: "content",
      title: "Content",
      type: "blockContent",
      hidden: ({ parent }) => parent?.type !== "internal",
    },
  ],
};
