#!/usr/bin/bash

rm -r ../dist
mkdir -p ../dist

npm run release

folder="../../merchandiseToSeller_deployuat"

if [[ -d $folder ]]; then
  cp -a ../dist $folder;
  cd $folder;
  git add -A;
  git commit -m ':boom Release :boom';
  git push;
  echo 发布完成;
else
  echo '目录不存在，请到gitlab上clone相关代码';
fi