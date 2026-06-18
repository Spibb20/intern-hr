"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
  updateConfigItem,
  deleteConfigItem,
} from "@/lib/actions";
import type { ConfigModel } from "@/lib/types";

export type FieldType = "text" | "color" | "select";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { id: string; name: string }[];
  placeholder?: string;
}

export interface ConfigManagerProps {
  model: ConfigModel;
  rows: Record<string, unknown>[];
  fields: FieldDef[];
  relatedLabels?: Record<string, Record<string, string>>;
}

function emptyDraft(fields: FieldDef[]) {
  const draft: Record<string, string> = {};
  fields.forEach((f) => {
    draft[f.key] = f.type === "color" ? "#b45309" : "";
  });
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
    fields.forEach((f) => {
      next[f.key] =
        row[f.key] != null
          ? String(row[f.key])
          : f.type === "color"
          ? "#b45309"
          : "";
    });
    setDraft(next);
    setDialogOpen(true);
  }

  function handleSave() {
    const nameField = fields[0];
    if (nameField.required && !draft[nameField.key]?.trim()) {
      toast.error(`${nameField.label} is required`);
      return;
    }
    startTransition(async () => {
      try {
        if (editingId) {
          await updateConfigItem(model, editingId, draft);
          toast.success("Record updated");
        } else {
          await createConfigItem(model, draft);
          toast.success("Record created");
        }
        setDialogOpen(false);
        router.refresh();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    });
  }

  function handleDelete() {
    if (!deleteId) return;
    startTransition(async () => {
      try {
        await deleteConfigItem(model, deleteId);
        toast.success("Record deleted");
        setDeleteId(null);
        router.refresh();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    });
  }

  function renderCell(row: Record<string, unknown>, field: FieldDef) {
    const value = row[field.key];
    if (field.type === "color") {
      return (
        <span className="flex items-center gap-2">
          <span
            className="size-4 rounded-full border border-border"
            style={{ background: String(value || "#b45309") }}
          />
          <span className="text-muted-foreground">{String(value || "")}</span>
        </span>
      );
    }
    if (field.type === "select") {
      const label = relatedLabels[field.key]?.[String(value)] ?? null;
      return label ? (
        <Badge variant="secondary">{label}</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    }
    return (
      <span>
        {value ? (
          String(value)
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </span>
    );
  }

  return (
    <div className="px-4 py-4 md:px-6">
      <div className="mb-3 flex items-center justify-end">
        <Button size="sm" onClick={openCreate}>
          <Plus className="size-4" />
          New
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/100 bg-background/45 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-control-bar/90 hover:bg-control-bar">
              {fields.map((f) => (
                <TableHead key={f.key}>{f.label}</TableHead>
              ))}
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={fields.length + 1}
                  className="h-24 text-center text-muted-foreground"
                >
                  No records yet. Click New to create one.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={String(row.id)}>
                  {fields.map((f) => (
                    <TableCell key={f.key}>{renderCell(row, f)}</TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => openEdit(row)}
                      >
                        <Pencil className="size-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(String(row.id))}
                      >
                        <Trash2 className="size-4" />
                        <span className="sr-only">Delete</span>
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
            <DialogTitle>
              {editingId ? "Edit record" : "New record"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            {fields.map((field) => (
              <div key={field.key} className="flex flex-col gap-1.5">
                <Label htmlFor={field.key}>
                  {field.label}
                  {field.required && (
                    <span className="ml-0.5 text-destructive">*</span>
                  )}
                </Label>
                {field.type === "select" ? (
                  <Select
                    value={draft[field.key] || undefined}
                    onValueChange={(v) =>
                      setDraft((d) => ({ ...d, [field.key]: v ?? "" }))
                    }
                  >
                    <SelectTrigger id={field.key}>
                      <SelectValue
                        placeholder={field.placeholder ?? "Select..."}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((o) => (
                        <SelectItem key={o.id} value={o.id}>
                          {o.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "color" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id={field.key}
                      value={draft[field.key] || "#b45309"}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                      }
                      className="h-9 w-14 cursor-pointer rounded-lg border border-border bg-transparent"
                    />
                    <Input
                      value={draft[field.key] || ""}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                      }
                      placeholder="#b45309"
                    />
                  </div>
                ) : (
                  <Input
                    id={field.key}
                    value={draft[field.key] || ""}
                    placeholder={field.placeholder}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Discard
            </Button>
            <Button onClick={handleSave} disabled={isPending}>
              Save
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
            <AlertDialogTitle>Delete this record?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The record will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
