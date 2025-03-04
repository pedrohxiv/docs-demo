import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const documentId = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      initialContent: args.initialContent,
      ownerId: user.subject,
      organizationId,
    });

    return documentId;
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { paginationOpts, search }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    if (search && organizationId) {
      const documents = await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);

      return documents;
    }

    if (search) {
      const documents = await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);

      return documents;
    }

    if (organizationId) {
      const documents = await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);

      return documents;
    }

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);

    return documents;
  },
});

export const removeById = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const document = await ctx.db.get(args.id as Id<"documents">);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;

    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.delete(args.id as Id<"documents">);
  },
});

export const updateById = mutation({
  args: {
    id: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const document = await ctx.db.get(args.id as Id<"documents">);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;

    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.patch(args.id as Id<"documents">, {
      title: args.title,
    });
  },
});

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id as Id<"documents">);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    return document;
  },
});

export const getByIds = query({
  args: { ids: v.array(v.string()) },
  handler: async (ctx, args) => {
    const documents = [];

    for (const id of args.ids) {
      const document = await ctx.db.get(id as Id<"documents">);

      if (document) {
        documents.push({ id: document._id, name: document.title });
      } else {
        documents.push({ id, name: "[Removed]" });
      }
    }

    return documents;
  },
});
