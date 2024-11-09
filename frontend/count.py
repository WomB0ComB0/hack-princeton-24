import os
import sys
from typing import List, Optional


class FileSystem:
    def __init__(self) -> None:
        self.path: str = os.path.dirname(os.path.abspath(__file__))

    def folder_structure(
        self, path: Optional[str] = None, ignore_dirs: Optional[List[str]] = None, ignore_files: Optional[List[str]] = None
    ) -> List[str]:
        if path is None:
            path = self.path
        if ignore_dirs is None:
            ignore_dirs = []
        if ignore_files is None:
            ignore_files = []
        structure: List[str] = []
        try:
            for root, dirs, files in os.walk(path):
                # Skip ignored directories
                dirs[:] = [d for d in dirs if os.path.join(root, d) not in ignore_dirs]
                
                level: int = root.replace(path, '').count(os.sep)
                indent: str = ' ' * 4 * level
                structure.append(f"{indent}{os.path.basename(root)}/")
                subindent: str = ' ' * 4 * (level + 1)
                
                # Add files that are not in ignore_files
                for f in files:
                    if f not in ignore_files:
                        structure.append(f"{subindent}{f}")
        except OSError as e:
            print(f"Error: Unable to access directory '{path}': {e}")
        return structure

    def __str__(self) -> str:
        return f"FileSystem({self.path})"


def main() -> None:
    fs = FileSystem()
    ignore_dirs = [os.path.join(fs.path, "node_modules"), os.path.join(fs.path, "dir_to_ignore2")]
    ignore_files = ["package-lock.json", "README.md", "pnpm-lock.yaml", "yarn.lock", "bun.lockb"]
    print(f"Folder structure of current directory {fs.path}:")
    for item in fs.folder_structure(ignore_dirs=ignore_dirs, ignore_files=ignore_files):
        print(item)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"An error occurred: {e}")
