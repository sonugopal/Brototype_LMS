export function removeHtmlTags(str: string) {
    if ((str===null) || (str===''))
        return '';
    else
        str = str.toString();
    // Remove input tags
    str = str.replace(/<input[^>]*>/g, '');
    // Remove select tags
    str = str.replace(/<select[^>]*>[\s\S]*?<\/select>/g, '');
    // Remove textarea tags
    str = str.replace(/<textarea[^>]*>[\s\S]*?<\/textarea>/g, '');
    // Remove remaining HTML tags
    str = str.replace(/<[^>]*>/g, '');
    return str;
}
