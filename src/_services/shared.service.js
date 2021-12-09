function getExtension(mediaUrl) {
    const types = new Map([
        ["jpg", "img"],
        ["gif", "img"],
        ["jpeg", "img"],
        ["png", "img"],
        ["mp4", "video"],
        ["3gp", "video"],
        ["flv", "video"]
    ])
    const url = new URL(mediaUrl);
    const extension = url.pathname.split(".")[1];
    const element = types.get(extension)
    return element;
}

export const sharedService = {
    getExtension
}