export function ConvertRaitingsPepole(numberofpepole: number)
{
    const stringnum = numberofpepole.toString();
    if ( numberofpepole < 999) return stringnum;
    let result;
    if ( numberofpepole > 9999) 
    {
        result = stringnum.slice(0,2) + " " + stringnum.slice(2);
    } else
    {
        result = stringnum.slice(0, 1) + ' ' + stringnum.slice(1);
    }
    return result;
}