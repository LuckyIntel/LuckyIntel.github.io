function typewriter(string, idx=0, ms, onEnd = () => {}, oldInner = null)
{
    if (idx == 0)
    {
        oldInner = string.innerHTML;
        string.innerHTML = "";
    };
    if (idx > oldInner.length - 1) {onEnd(); return;};
    setTimeout(() => {
        string.innerHTML += oldInner[idx];
        idx++;
        typewriter(string, idx, ms, onEnd, oldInner);
    }, ms);
};