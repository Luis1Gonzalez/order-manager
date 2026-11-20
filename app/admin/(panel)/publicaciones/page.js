import Image from "next/image";
import { Eye, EyeOff, Newspaper, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { storageEnabled } from "@/lib/storage";
import { cn, formatDate } from "@/lib/utils";
import { deletePost, togglePostPublished } from "@/app/actions/admin";
import { PageHeader } from "@/components/admin/PageHeader";
import { ActionButton } from "@/components/admin/ActionButton";
import { PostForm } from "@/components/admin/forms";
import { Card, EmptyState } from "@/components/ui";

export const metadata = { title: "Publicaciones" };

export default async function PublicacionesPage() {
  await requireAdmin();
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <PageHeader title="Publicaciones" description="Ofertas y novedades que se muestran en la página principal." />

      <Card className="mb-8 p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold">Nueva publicación</h2>
        <PostForm imagesEnabled={storageEnabled} />
      </Card>

      {posts.length === 0 ? (
        <EmptyState icon={Newspaper} title="Todavía no hay publicaciones" />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Card className={cn("flex h-full flex-col overflow-hidden", !post.published && "opacity-60")}>
                <div className="relative aspect-[16/9] bg-cream-100">
                  {post.imageUrl && (
                    <Image src={post.imageUrl} alt="" fill sizes="(min-width: 1280px) 33vw, 50vw" className="object-cover" />
                  )}
                  {!post.published && (
                    <span className="absolute left-3 top-3 rounded-full bg-ink-900/80 px-2.5 py-0.5 text-xs text-white">Oculta</span>
                  )}
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold">{post.title}</h3>
                    {post.price && <span className="shrink-0 font-semibold text-brand-700">{post.price}</span>}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-500">{post.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-cream-200 px-4 py-2">
                  <span className="text-xs text-ink-500">{formatDate(post.createdAt)}</span>
                  <span className="flex">
                    <ActionButton variant="ghost" size="sm" action={togglePostPublished.bind(null, post.id)}>
                      {post.published ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
                      {post.published ? "Ocultar" : "Publicar"}
                    </ActionButton>
                    <ActionButton
                      variant="ghost"
                      size="icon"
                      aria-label={`Eliminar ${post.title}`}
                      action={deletePost.bind(null, post.id)}
                      confirm={`¿Eliminar "${post.title}"?`}
                    >
                      <Trash2 className="size-4" />
                    </ActionButton>
                  </span>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
