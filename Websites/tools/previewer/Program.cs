using System.Diagnostics;
using System.IO.Compression;
using System.Reflection;
using System.Security.Cryptography;

// Unpacks the embedded replicas once per bundle version, then opens the gallery in the default browser.
// Sites are opened over file://, which is how RULES.md requires them to work.
using var bundle = Assembly.GetExecutingAssembly().GetManifestResourceStream("sites.zip")
    ?? throw new InvalidOperationException("sites.zip resource missing; build with build.py");
var hash = Convert.ToHexString(SHA256.HashData(bundle))[..12];
bundle.Position = 0;

var root = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "ReplicaPreview");
var target = Path.Combine(root, hash);
if (!File.Exists(Path.Combine(target, "index.html")))
{
    // Extract to a temp folder and rename, so an interrupted run never leaves a half-extracted cache.
    var temp = target + ".partial";
    if (Directory.Exists(temp)) Directory.Delete(temp, true);
    ZipFile.ExtractToDirectory(bundle, temp);
    if (Directory.Exists(target)) Directory.Delete(target, true);
    Directory.Move(temp, target);
}

var index = Path.Combine(target, "index.html");
Process.Start(new ProcessStartInfo(index) { UseShellExecute = true });
Console.WriteLine($"Opened the replica gallery in your browser:\n  {index}\n\nYou can close this window.");
if (!args.Contains("--no-wait")) Console.ReadLine();
