import { TargetFramework } from "./types";

export function toReadableFramework(targetFramework: string): TargetFramework | undefined {
  const typeMapping = {
    net: '.NETFramework',
    netcoreapp: '.NETCore',
    netstandard: '.NETStandard',
    v: '.NETFramework',
  };

  // HACK: this is an edge case and it's supported by NuGet design
  // https://github.com/NuGet/Home/issues/1371
  if (targetFramework === 'net4') {
    return {
      framework: typeMapping.net,
      original: targetFramework,
      version: '4',
    };
  }

  for (const type in typeMapping) {
    if (new RegExp(type + /\d.?\d(.?\d)?$/.source).test(targetFramework)) {
      return {
        framework: typeMapping[type],
        original: targetFramework,
        version: targetFramework.split(type)[1],
      };
    }
  }

  return undefined;
}
