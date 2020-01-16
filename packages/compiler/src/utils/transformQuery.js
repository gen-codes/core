/* Make thy queriy useful */
export default function transformQuery(filename) {
    /* Transformation Objects GenLang*/
    const queryTransformers=[{
        regex: /(.*?)\[(\b\w+\b)(.*?)(\b\w+\b)\]/g,
        expression: "$1[*$2$3$4]"
    },
    {
        regex: /(.*?)\[(\b\w+\b)\]/g,
        expression: "$1[*$2=true]"
    }
    ];
    return queryTransformers.reduce((transformed,transformer) => {
        return transformed.replace(transformer.regex,transformer.expression);
    },filename);
}
