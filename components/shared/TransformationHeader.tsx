export const TransformationHeader = ({title, description, type}: { title: string, description: string }) => {


    return (
        <>
            <h2 className="text-accent lg:text-start text-center">
                {title}
            </h2>
            {description && (
                <p className="mt-3 text-sm lg:text-start text-center">
                    {description}
                </p>
            )}
        </>
    );
};
