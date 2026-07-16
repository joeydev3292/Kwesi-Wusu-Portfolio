import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Director", value: "Director" },
              { title: "Cinematographer", value: "Cinematographer" },
              { title: "Editor", value: "Editor" },
              { title: "Producer", value: "Producer" },
              { title: "Writer", value: "Writer" },
              { title: "Colorist", value: "Colorist" },
              { title: "Sound Design", value: "Sound Design" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "genre",
      title: "Genre / Category",
      type: "string",
      options: {
        list: [
          { title: "Short Film", value: "short film" },
          { title: "Music Video", value: "music video" },
          { title: "Commercial", value: "commercial" },
          { title: "Documentary", value: "documentary" },
          { title: "Narrative", value: "narrative" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Direct Upload", value: "upload" },
          { title: "YouTube Link", value: "youtube" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: {
        accept: ".mp4,.mov",
      },
      hidden: ({ parent }) => parent?.mediaType !== "upload",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      hidden: ({ parent }) => parent?.mediaType !== "youtube",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "stillImages",
      title: "Still Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      role: "role",
    },
    prepare({ title, media, role }) {
      return {
        title,
        subtitle: role?.length ? `Roles: ${role.join(", ")}` : undefined,
        media,
      };
    },
  },
});
