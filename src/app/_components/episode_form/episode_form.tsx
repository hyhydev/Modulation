"use client";

import { zodResolver } from "@hookform/resolvers/zod";
// import { Edit, Plus, Type } from "lucide-react";
import { Edit, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Button } from "~/ui/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/ui/components/ui/form";
import { Input } from "~/ui/components/ui/input";
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  Dialog,
} from "~/ui/components/ui/dialog";
import { api } from "~/trpc/react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@radix-ui/react-select";
import { type episodes } from "~/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
});

type EpisodeFormProps = Partial<z.infer<typeof formSchema>>;

export function EpisodeForm({ id }: EpisodeFormProps) {
  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const createEpisode = api.episode.create.useMutation({
    onSuccess: () => utils.episode.invalidate(),
  });
  const updateEpisode = api.episode.update.useMutation({
    onSuccess: () => utils.episode.invalidate(),
  });

  type NonNull<Type> = {
    [Property in keyof Type as Property]: NonNullable<Type[Property]>;
  };

  type EpisodesForm = NonNull<InferSelectModel<typeof episodes>>;

  const form = useForm<EpisodesForm>({
    // const form = useForm<{ id?: number; name: string }>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   name,
    // },
  });

  async function onSubmit() {
    await form.trigger();
    const errors = Object.keys(form.formState.errors);
    if (errors.length > 0) {
      throw new Error("Form has errors");
    }
    if (!!id) {
      updateEpisode.mutate({
        // id,
        ...form.getValues(),
      });
    } else {
      createEpisode.mutate({
        ...form.getValues(),
      });
    }
    form.reset();
  }

  function onClose() {
    form.reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose();
        setOpen(false);
      }}
      modal={true}
    >
      <Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
        {id ? <Edit size={16} /> : <Plus />}
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {id ? `Update Episode ${id}` : "Create Episode"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Episode Name *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="character"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Character *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(Character).map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Play Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(Type).map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Play Speed *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(Speed).map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="environment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Play Environment *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(Environment).map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stage *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(Stage).map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["1", "2", "3", "4", "5"].map((type, idx) => (
                        <SelectItem key={idx} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </form>
        </Form>
        <DialogFooter className="flex sm:justify-end">
          <Button
            disabled={!form.formState.isValid}
            type="button"
            onClick={async () => {
              await onSubmit();
              setOpen(false);
            }}
          >
            Save Episode
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
