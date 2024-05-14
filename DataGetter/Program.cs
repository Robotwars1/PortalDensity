using System.Xml;

int[] SpChamberString = [47459, 47454, 47451, 47107, 47734, 47737, 47739, 47743, 47745, 47466, 47747, 47749, 47750, 47753, 47754, 47757, 47758, 47761, 47762, 47765, 47767, 47769, 47771, 47772, 47775, 47777, 47778, 47781, 47782, 47785, 47786, 47467, 47470, 47471, 47792, 47794, 47796, 47799, 47801, 47803, 47805, 47807, 47809, 47812, 47814, 47816, 47818, 47820, 47822, 47823, 47457];
int[] CoopChamberString = [47740, 47826, 47827, 47830, 45466, 46361, 47832, 47834, 47836, 47838, 47839, 47842, 47843, 47846, 47847, 47850, 47855, 47857, 47859, 47860, 52641, 52659, 52661, 52664, 52666, 52668, 52672, 52688, 52690, 52692, 52778, 52693, 52712, 52713, 52716, 52718, 52736, 52737, 52739, 49342, 49344, 49346, 49348, 49350, 49352, 52758, 52760, 48288];

Console.WriteLine("Press enter to start");
Console.ReadLine();

int[] SpCount = new int[SpChamberString.Length];
int[] CoopCount = new int[CoopChamberString.Length];

for (int i = 0; i < SpChamberString.Length; i++)
{
    SpCount[i] = GetSteamData(SpChamberString[i]).Result;
}
for (int i = 0; i < CoopChamberString.Length; i++)
{
    CoopCount[i] = GetSteamData(CoopChamberString[i]).Result;
}

async Task<int> GetSteamData(int MapId)
{
    Console.WriteLine($"Fetching {MapId}");

    var Client = new HttpClient();

    string Url = $"https://steamcommunity.com/stats/Portal2/leaderboards/{MapId}?xml=1&start=5000&end=5000";

    var Response = await Client.GetAsync(Url);

    // If success
    if (Response.IsSuccessStatusCode)
    {
        string Data = await Response.Content.ReadAsStringAsync();
        Data = Data.Remove(0, 55);
        XmlDocument xml = new();
        xml.LoadXml(Data);
        int Score = int.Parse(xml.SelectSingleNode("response/entries/entry/score").InnerText);
        return Score;
    }
    else
    {
        Console.WriteLine($"Failed to get data for ID {MapId}");
        return -1;
    }
}

Console.ReadLine();

// Write out for JS const array
Console.Write("[");
for (int i = 0; i < SpChamberString.Length; i++)
{
    Console.Write($"{SpCount[i]}, ");
}
Console.Write("]");
Console.Write("\n[");
for (int i = 0; i < CoopChamberString.Length; i++)
{
    Console.Write($"{CoopCount[i]}, ");
}
Console.Write("]");
