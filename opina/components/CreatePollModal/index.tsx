"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPoll } from "@/app/actions/polls";

export default function CreatePollModal() {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState(["", ""]);

    function addOption()
    {
        setOptions([...options, ""]);
    }

    function removeOption(index: number) 
    {
        if (options.length <= 2) return;

        setOptions(options.filter((_, i) => i !== index));
    }

    function updateOption(index: number, value: string) 
    {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    }

    function closeModal() 
    {
        setIsOpen(false);
    }

    async function handleSubmit(formData: FormData) 
    {
        try 
        {
            await createPoll(formData);

            setIsOpen(false);
            setOptions(["", ""]);

            router.refresh();
        } 
        catch (error) 
        {
            console.error(error);
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
                Criar enquete
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    
                    <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-xl">
                        
                        <div className="flex items-center justify-between border-b p-6">
                            <h2 className="text-2xl font-bold">
                                Criar enquete
                            </h2>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-2xl text-gray-500 hover:text-gray-800"
                            >
                                ×
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto p-6">
                            <form action={handleSubmit} className="flex flex-col gap-5">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Título
                                    </label>

                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        required
                                        placeholder="Ex: Qual linguagem você prefere?"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Descrição
                                    </label>

                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        placeholder="Descreva sua enquete..."
                                        className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-700">
                                            Opções
                                        </label>

                                        <button
                                            type="button"
                                            onClick={addOption}
                                            className="text-sm font-medium text-blue-500 hover:underline"
                                        >
                                            + Adicionar opção
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {options.map((option, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2"
                                            >
                                                <input
                                                    type="text"
                                                    name="options"
                                                    value={option}
                                                    onChange={(e) =>
                                                        updateOption(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    placeholder={`Opção ${index + 1}`}
                                                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />

                                                {options.length > 2 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeOption(index)
                                                        }
                                                        className="rounded-md bg-red-100 px-3 text-red-600 hover:bg-red-200"
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 border-t pt-5">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                    >
                                        Criar enquete
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}