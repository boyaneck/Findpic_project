export default async function downloadImage(url: string, name: string): Promise<void> {
  try {
    const resp = await fetch(url);
    const blob = await resp.blob();

    const imageUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = imageUrl;
    a.download = name;
    document.body.appendChild(a);

    a.click();

    window.URL.revokeObjectURL(imageUrl);
  } catch (error) {
    alert('다운로드 중 오류가 발생했습니다. 죄송합니다.');
  }
}
