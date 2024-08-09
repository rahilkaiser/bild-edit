"use client"

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {CustomField} from "@/components/shared/CustomField";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {aspectRatioOptions, transformationTypes} from "@/constants";
import {useState, useTransition} from "react";
import {TransformationConfig, TransformationFormProps} from "@/types/image";
import {AspectRatioKey, deepMergeObjects} from "@/lib/utils";


export const formSchema = z.object({
    title: z.string().min(1),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
})

const defaultValues = {
    title: '',
    aspectRatio: '',
    color: '',
    prompt: '',
    publicId: '',
}

export const TransformationForm = (
    {
        action,
        data = null,
        userId,
        type,
        creditBalance,
        config = null
    }: TransformationFormProps) => {


    const [image, setImage] = useState(data);
    const [newTransformation, setNewTransformation] = useState<TransformationConfig | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isTransforming, setIsTransforming] = useState<boolean>(false);
    const [transformationConfig, setTransformationConfig] = useState<any>(config);
    const [isPending, startTransition] = useTransition();
    const transformation = transformationTypes[type];
    const initalValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    } : defaultValues;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initalValues,
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    function onSelectFieldChange(value: string, onChange: (value: string) => void) {
        const imageSize = aspectRatioOptions[value as AspectRatioKey];
        setImage((prevState: any) => ({
            ...prevState,
            aspectRatio: imageSize.aspectRatio,
            width: imageSize.width,
            height: imageSize.height,
        }))
        setNewTransformation(transformation.config)
        return onChange(value)
    }

    function onInputChangeHandler(fieldName: string, value: string, type: string, onChange: (value: string) => void) {
        setNewTransformation((prevState: any) => ({
                ...prevState ,
                [type]: {
                    ...prevState?.[type],
                    [(fieldName === 'prompt') ? 'prompt' : 'to']: value
                },
            }))
        return onChange(value)
    }

    // TODO: Return to update Credits
    async function onTransformHandler() {
        setIsTransforming(true);
        setTransformationConfig(deepMergeObjects(
            newTransformation, transformationConfig
        ));
        setNewTransformation(null);
        startTransition(async () => {
            // await updateCredits(userId, -1);
        })
    }

// @ts-ignore
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomField
                    name="title"
                    formLabel="Image Title"
                    control={form.control}
                    render={({field}) => <Input {...field}
                                                className="bg-primary/40 focus-visible:ring-accent transition-shadow duration-300"/>
                    }
                />

                {type === 'fill' && (
                    <CustomField
                        name="aspectRatio"
                        formLabel="Aspect Ratio"
                        control={form.control}
                        render={({field}) => (
                            <Select
                                onValueChange={(value) => onSelectFieldChange(value, field.onChange)}
                            >
                                <SelectTrigger
                                    className="w-[180px] focus-visible:ring-accent transition-shadow duration-300">
                                    <SelectValue placeholder="Select Size"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(aspectRatioOptions).map((option) => (
                                        <SelectItem
                                            key={option}
                                            value={option}
                                        >
                                            {aspectRatioOptions[option as AspectRatioKey].label}
                                        </SelectItem>
                                    ))}

                                </SelectContent>
                            </Select>
                        )
                        }
                    />
                )}
                {(type === 'remove' || type === 'recolor') &&
                    <div className="">
                        <CustomField
                            control={form.control}
                            name={"prompt"}
                            formLabel={
                                type === 'remove' ? "Object to remove" : "Object to recolor"
                            }
                            render={({field}) => (
                                <Input
                                    value={field.value}
                                    onChange={(e) => onInputChangeHandler('prompt', e.target.value, type, field.onChange)}
                                    className="bg-primary/40 focus-visible:ring-accent transition-shadow duration-300"/>
                            )
                            }
                        />
                        {type === 'recolor' && (
                            <CustomField
                                name="color"
                                formLabel="Replacement Color"
                                control={form.control}
                                render={({field}) => (
                                    <Input
                                        value={field.value}
                                        onChange={(e) => onInputChangeHandler('color', e.target.value, "recolor", field.onChange)}
                                        className="bg-primary/40 focus-visible:ring-accent transition-shadow duration-300"/>
                                )}
                            />
                        )}
                    </div>

                }
                <div className="flex flex-col w-fit gap-4">
                    <Button
                        type="button"
                        className="uppercase"
                        disabled={isTransforming || newTransformation === null}
                        onClick={onTransformHandler}
                    >
                        {isTransforming ? 'Transforming...' : 'Apply Transformation'}
                    </Button>
                    <Button
                        type="submit"
                        className="uppercase"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Save Image'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};