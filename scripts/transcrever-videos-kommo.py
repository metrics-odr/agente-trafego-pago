#!/usr/bin/env python3
"""Transcreve o áudio de vídeos baixados do Drive do Kommo (português).

Uso:  python3 -I scripts/transcrever-videos-kommo.py <pasta_com_mp4> [saida.json]
Requisitos: ffmpeg no PATH e `pip install faster-whisper numpy`.
Notas:
- Extrai o áudio com ffmpeg e passa como array (evita incompatibilidade do PyAV).
- Vídeo sem áudio ou só com música volta vazio ou "Música": isso NÃO é falha.
- Modelo "small" erra nomes próprios (ex.: "Le Contour" -> "Lei Contour", "Thiago" -> "Tiago").
  Sempre revisar o texto antes de usar como roteiro.
- Não grava nada no repositório: o JSON de saída vai para onde você indicar.
"""
import glob, json, subprocess, sys
import numpy as np
from faster_whisper import WhisperModel

pasta = sys.argv[1]
saida = sys.argv[2] if len(sys.argv) > 2 else "transcricoes.json"
modelo = WhisperModel("small", device="cpu", compute_type="int8")
resultado = {}
for arquivo in sorted(glob.glob(f"{pasta}/*.mp4")):
    bruto = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", arquivo, "-vn", "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
        capture_output=True).stdout
    if not bruto:
        resultado[arquivo] = "SEM AUDIO"
        print(arquivo, "SEM AUDIO")
        continue
    audio = np.frombuffer(bruto, dtype=np.float32)
    trechos, _ = modelo.transcribe(audio, language="pt", vad_filter=False, beam_size=5)
    resultado[arquivo] = [(round(t.start, 1), round(t.end, 1), t.text.strip()) for t in trechos]
    print(arquivo, round(len(audio) / 16000, 1), "s")
    for ini, fim, texto in resultado[arquivo]:
        print(f"  [{ini}-{fim}] {texto}")
json.dump(resultado, open(saida, "w"), ensure_ascii=False, indent=1)
