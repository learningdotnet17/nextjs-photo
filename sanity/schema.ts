import { defineField, defineType } from "sanity"

export const photoSchema = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["exif", "location", "lqip", "palette"],
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Short headline for the photo",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Detailed description of the photo",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: 'Add tags like "Mountains", "Sunset", "Recent", etc. Use "Recent" to show in Recent Work section.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      options: {
        list: [
          { title: "Landscape", value: "landscape" },
          { title: "Portrait", value: "portrait" },
        ],
        layout: "radio",
      },
      initialValue: "landscape",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured in Hero Carousel",
      type: "boolean",
      description: "Show this photo in the homepage hero carousel",
      initialValue: false,
    }),
    defineField({
      name: "showInGalleries",
      title: "Show in Galleries",
      type: "boolean",
      description: "Show this photo in the galleries section",
      initialValue: true,
    }),
    defineField({
      name: "location",
      title: "Location Override",
      type: "string",
      description: "Optional: Override location if EXIF data is missing or incorrect",
    }),
    defineField({
      name: "camera",
      title: "Camera Override",
      type: "string",
      description: "Optional: Override camera if EXIF data is missing or incorrect",
    }),
    defineField({
      name: "lens",
      title: "Lens Override",
      type: "string",
      description: "Optional: Override lens if EXIF data is missing or incorrect",
    }),
    defineField({
      name: "aperture",
      title: "Aperture Override",
      type: "string",
      description: 'Optional: Override aperture (e.g., "f/2.8") if EXIF data is missing',
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      tags: "tags",
    },
    prepare(selection) {
      const { title, media, tags } = selection
      return {
        title,
        subtitle: tags?.join(", ") || "No tags",
        media,
      }
    },
  },
  orderings: [
    {
      title: "Sort Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
})

export const schemaTypes = [photoSchema]
