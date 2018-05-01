export function showSuccessMsg(msg, headingTxt, timeout) {
    if (typeof(timeout) == 'undefined') {
        timeout = 5000;
    }

    $.toast({
        heading: typeof (headingTxt) != 'undefined' ? headingTxt : 'Success',
        text: msg,
        position: 'top-right',
        loaderBg:'#26c6da',
        icon: 'success',
        hideAfter: timeout
    });
}

export function showErrorMsg(msg, headingTxt, timeout) {
    if (typeof(timeout) == 'undefined') {
        timeout = 5000;
    }

    $.toast({
        heading: typeof (headingTxt) != 'undefined' ? headingTxt : 'Error',
        text: msg,
        position: 'top-right',
        loaderBg:'#ff6849',
        icon: 'error',
        hideAfter: timeout
    });
}