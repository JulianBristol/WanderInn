"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import CloudinaryUpload from "../inputs/CloudinaryUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            description: '',
            imageSrc: '',
            category: '',
            roomCount: 1,
            bathroomCount: 1,
            guestCount: 1,
            location: null,
            price: 1,
        }
    });

    //watches for changes to the form field named "category" and returns its current value
    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        /* sets the value for specific form fields. Fields are identified by the id,
        and the is passed by the value. the shouldValidate, shouldDirty, and shouldTouch
        just tells the function to validate the content, mark as dirty if changed, 
        or mark as touched if the user interacted with it respectively */
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    // Step backwards in STEPS
    const onBack = () => {
        setStep((value) => value - 1)
    }

    //Step forwards in STEPS
    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Listing Created successfully!")
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY)
            rentModal.onClose()
        })
        .catch(() => {
            toast.error("Something went wrong...")
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    //This useMemo checks if step === STEPS.PRICE and if it does, return "Create"
    //It optimizes functionality because it only executes when step === STEPS.PRICE
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create";
        }
        return "Next"
    }, [step])

    const secondaryLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return "Back"
    }, [step])

    let body = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div className="
            smallScroll-Vertical
            grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto
            ">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        body = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    onChange={(value) => setCustomValue('location', value)}
                    value={location}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        body = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basic info about your place"
                    subtitle="What amenities do you provide?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue("guestCount", value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue("roomCount", value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        body = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <CloudinaryUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue("imageSrc", value)}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        body = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        body = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (
        <Modal
            title="Share Your Home"
            body={body}
            isOpen={rentModal.isOpen}
            onSubmit={handleSubmit(onSubmit)}
            onClose={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        />
    )
}

export default RentModal;