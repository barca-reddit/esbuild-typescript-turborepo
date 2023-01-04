/**
 * Do not call this script from anywhere else other than project root,
 * otherwise the context of process.cwd changes.
 */

import { readFile } from 'fs/promises';
import fg from 'fast-glob';

class Dependencies {
    constructor() {
        this.packageList = [];
        this.misMatchList = [];
    }

    addDependencies({ dependencyList, pkgParent, pkgPath }) {
        for (const [pkgName, pkgVersion] of Object.entries(dependencyList)) {
            this.packageList.push({
                pkgName: pkgName,
                pkgVersion: pkgVersion,
                pkgParent: pkgParent,
                pkgPath: pkgPath
            })
        }
    }

    async getAll() {
        for (const pkgPath of await fg('**/package.json', { ignore: '**/node_modules/**' })) {
            const { name, dependencies, devDependencies, peerDependencies } = JSON.parse(
                await readFile(pkgPath, 'utf-8')
            );

            if (dependencies) {
                this.addDependencies({ dependencyList: dependencies, pkgParent: name, pkgPath: pkgPath })
            }
            if (devDependencies) {
                this.addDependencies({ dependencyList: devDependencies, pkgParent: name, pkgPath: pkgPath })
            }
            if (peerDependencies) {
                this.addDependencies({ dependencyList: peerDependencies, pkgParent: name, pkgPath: pkgPath })
            }
        }
        return this;
    }

    checkMismatches() {
        const packageNames = [...new Set(this.packageList.map(p => p.pkgName))];

        for (const pkgName of packageNames) {
            const pkgSiblings = this.packageList.filter(p => p.pkgName === pkgName);
            if (pkgSiblings.length > 1 && pkgSiblings.some(p => p.pkgVersion !== pkgSiblings[0].pkgVersion)) {
                this.misMatchList.push(pkgSiblings);
            }
        }

        if (this.misMatchList.length > 0) {
            throw new Error(
                `Found version mismatch for the following package${this.misMatchList.length > 1 ? 's' : ''}` + ':\n\n' +
                this.misMatchList
                    .map(pkg =>
                        `${pkg[0].pkgName} - versions: ${[...new Set(pkg.map(p => p.pkgVersion))].join(', ')}\n` +
                        pkg.map((p, i) => `- ${p.pkgPath} (${pkg[i].pkgParent}) - ${pkg[i].pkgVersion}`).join('\n') + '\n'
                    ).join('\n')
            )
        }

        console.log('All package versions appear to be in sync.\n');
    }
}

(await new Dependencies().getAll()).checkMismatches();
