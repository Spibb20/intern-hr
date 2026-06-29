"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  createConfigItem,
  deleteConfigItem,
  updateConfigItem,
} from "@/lib/actions";
import type { FieldType } from "@/lib/types";

export type { FieldType } from "@/lib/types";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { id: string; name: string }[];
  placeholder?: string;
}

export interface ConfigManagerProps {
  model: string;
  rows: Record<string, unknown>[];
  fields: FieldDef[];
  relatedLabels?: Record<string, Record<string, string>>;
}

function emptyDraft(fields: FieldDef[]) {
  const draft: Record<string, string> = {};
  for (const field of fields)
    draft[field.key] = field.type === "color" ? "#6b7280" : "";
  return draft;
}

export function ConfigManager({
  model,
  rows,
  fields,
  relatedLabels = {},
}: ConfigManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>(
    emptyDraft(fields)
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditingId(null);
    setDraft(emptyDraft(fields));
    setDialogOpen(true);
  }

  function openEdit(row: Record<string, unknown>) {
    setEditingId(String(row.id));
    const next: Record<string, string> = {};
    for (const field of fields)
      next[field.key] = row[field.key] != null ? String(row[field.key]) : "";
    setDraft(next);
    setDialogOpen(true);
  }

  function save() {
    const required = fields.find(
      (field) => field.required && !draft[field.key]?.trim()
    );
    if (required) {
      toast.error(`${required.label} шаардлагатай`);
      return;
    }
    startTransition(async () => {
      try {
        if (editingId) {
          await updateConfigItem(model, editingId, draft);
          toast.success("Мэдээлэл шинэчлэгдлээ");
        } else {
          await createConfigItem(model, draft);
          toast.success("Мэдээлэл нэмэгдлээ");
        }
        setDialogOpen(false);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Алдаа гарлаа");
      }
    });
  }

  function remove() {
    if (!deleteId) return;
    startTransition(async () => {
      try {
        await deleteConfigItem(model, deleteId);
        toast.success("Мэдээлэл устлаа");
        setDeleteId(null);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Алдаа гарлаа");
      }
    });
  }

  function cell(row: Record<string, unknown>, field: FieldDef) {
    const value = row[field.key];
    if (field.type === "select") {
      const label = relatedLabels[field.key]?.[String(value)] ?? "";
      return label ? (
        <Badge variant="secondary">{label}</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    }
    if (field.type === "color") {
      return (
        <span className="inline-flex items-center gap-2">
          <span
            className="size-4 rounded-sm border"
            style={{ background: String(value || "#6b7280") }}
          />
          {String(value || "")}
        </span>
      );
    }
    return value ? (
      String(value)
    ) : (
      <span className="text-muted-foreground">—</span>
    );
  }

  return (
    <div className="px-4 py-4 md:px-6">
      <div className="mb-3 flex justify-end">
        <Button size="sm" onClick={openCreate}>
          Шинээр нэмэх
        </Button>
      </div>

      <div className="overflow-hidden rounded-sm border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {fields.map((field) => (
                <TableHead key={field.key}>{field.label}</TableHead>
              ))}
              <TableHead className="w-24 text-right">Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={fields.length + 1}
                  className="h-24 text-center text-muted-foreground"
                >
                  Мэдээлэл байхгүй байна.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={String(row.id)}>
                  {fields.map((field) => (
                    <TableCell key={field.key}>{cell(row, field)}</TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(row)}
                      >
                        Засах
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(String(row.id))}
                      >
                        Устгах
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Засах" : "Шинээр нэмэх"}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            {fields.map((field) => (
              <div key={field.key} className="grid gap-1.5">
                <Label htmlFor={field.key}>
                  {field.label}
                  {field.required ? (
                    <span className="ml-0.5 text-destructive">*</span>
                  ) : null}
                </Label>
                {field.type === "select" ? (
                  <Select
                    value={draft[field.key] || "__none"}
                    onValueChange={(value) =>
                      setDraft((current) => ({
                        ...current,
                        [field.key]: value === "__none" ? "" : value,
                      }))
                    }
                  >
                    <SelectTrigger id={field.key}>
                      <SelectValue
                        placeholder={field.placeholder ?? "Сонгох"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none">—</SelectItem>
                      {field.options?.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "color" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id={field.key}
                      value={draft[field.key] || "#6b7280"}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }))
                      }
                      className="h-9 w-14 rounded-sm border bg-transparent"
                    />
                    <Input
                      value={draft[field.key] || ""}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }))
                      }
                    />
                  </div>
                ) : (
                  <Input
                    id={field.key}
                    type={
                      field.type === "number" || field.type === "decimal"
                        ? "number"
                        : field.type === "date"
                        ? "date"
                        : "text"
                    }
                    step={field.type === "decimal" ? "0.01" : undefined}
                    value={draft[field.key] || ""}
                    placeholder={field.placeholder}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Цуцлах
            </Button>
            <Button onClick={save} disabled={isPending}>
              Хадгалах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Устгах уу?</AlertDialogTitle>
            <AlertDialogDescription>
              Холбоотой бичлэгтэй бол өгөгдлийн сангийн constraint-ээс шалтгаалж
              устахгүй байж болно.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Цуцлах</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                remove();
              }}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Устгах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
