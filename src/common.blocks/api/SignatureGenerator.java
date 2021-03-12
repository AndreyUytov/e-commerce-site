//package com.walmart.platform.common;

import java.io.ObjectStreamException;
import java.security.KeyRep;
import java.security.PrivateKey;
import java.security.Signature;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.Base64;


public class SignatureGenerator {

    public static void main(String[] args) {
        SignatureGenerator generator = new SignatureGenerator();

        String consumerId = "075b69b4-da03-4c19-8dd1-02f49c154ec4";
        String priviateKeyVersion = "1";
        String privateKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKukZfvjc1akgWRSTihhNCynFi+Ma65JQocNLupTEZKDWDc240XKOt6cIt0Jgv4JW1eiJdEsGOVuL45S8+XreZFWht+jNid3PamkM95o9VpK+UOezRt67v8oyPzmAGJI2Rl5TNQVuc2XjXP/kq8Yr3c7Ho5xTJFreJW/9mAMKTSfAgMBAAECgYA3ZmOobpyOraA54jrp2538f52wkTE8WtcHQiEPbupwEMbLY4Ltxr1Dlr/F+kj2d8yst2BfaE1M2EivNmUUo/FjiDCMpuUz2tw3Cba1ATdPvv05bSmFdSYSaeEq5A4xVIDQmvgCp+eeWZj6sDLjI31FL+pBK20Hr/37jOultUfgcQJBAO/E3F8S6/p/8jwhnFVcNbsNwzV+DROfxfVYtsD1QD+kzx5OFPn/u/0kLL501Puf07dRMfdabarC/j+2rb2/ascCQQC3QuqSdBERZI9cYjJ9XlaTzhy4U0vyn/BhyInzgfwo0E/gcJK+BwlMYjs49vzINPdVSaaecakF5vZuvxoYtU9pAkBJqwqqi33FsZoTr6AA+hvoJQpdXSVXajfAckl0b+YVp+WbQhJf3Zs84+h7fBoUVb8PC/t2LGqVlOPZX59yNWXxAkAgaAfc8ANYpQSo3IB7JOSAbJEtkyU5+UhjsjeaxOCXQwbs9FsumUXuqOw6DYrzyFH4VfbNy+GMtqPbP5XYyq8JAkEAiRze9t5GquKWn2I1b3xbJjOaMZZ5R3SibNupaYrsNA4mR/GjTPCo/80DBIaYmkTk4ikDnt8OkoQcPxRXcjD8yQ==";

        long intimestamp = System.currentTimeMillis();

        System.out.println("consumerId: " + consumerId);
        System.out.println("intimestamp: " + intimestamp);

        Map<String, String> map = new HashMap<>();
        map.put("WM_CONSUMER.ID", consumerId);
        map.put("WM_CONSUMER.INTIMESTAMP", Long.toString(intimestamp));
        map.put("WM_SEC.KEY_VERSION", priviateKeyVersion);

        String[] array = canonicalize(map);

        String data = null;

        try {
            data = generator.generateSignature(privateKey, array[1]);
        } catch(Exception e) { }
        System.out.println("Signature: " + data);
    }
    public String generateSignature(String key, String stringToSign) throws Exception {
        Signature signatureInstance = Signature.getInstance("SHA256WithRSA");

        ServiceKeyRep keyRep = new ServiceKeyRep(KeyRep.Type.PRIVATE, "RSA", "PKCS#8", Base64.getDecoder().decode(key));

        PrivateKey resolvedPrivateKey = (PrivateKey) keyRep.readResolve();

        signatureInstance.initSign(resolvedPrivateKey);

        byte[] bytesToSign = stringToSign.getBytes("UTF-8");
        signatureInstance.update(bytesToSign);
        byte[] signatureBytes = signatureInstance.sign();

        String signatureString = Base64.getEncoder().encodeToString(signatureBytes);

        return signatureString;
    }
    protected static String[] canonicalize(Map<String, String> headersToSign) {
        StringBuffer canonicalizedStrBuffer=new StringBuffer();
        StringBuffer parameterNamesBuffer=new StringBuffer();
        Set<String> keySet=headersToSign.keySet();

        // Create sorted key set to enforce order on the key names
        SortedSet<String> sortedKeySet=new TreeSet<String>(keySet);
        for (String key :sortedKeySet) {
            Object val=headersToSign.get(key);
            parameterNamesBuffer.append(key.trim()).append(";");
            canonicalizedStrBuffer.append(val.toString().trim()).append("\n");
        }
        return new String[] {parameterNamesBuffer.toString(), canonicalizedStrBuffer.toString()};
    }

    class ServiceKeyRep extends KeyRep  {
        private static final long serialVersionUID = -7213340660431987616L;
        public ServiceKeyRep(Type type, String algorithm, String format, byte[] encoded) {
            super(type, algorithm, format, encoded);
        }
        protected Object readResolve() throws ObjectStreamException {
            return super.readResolve();
        }
    }
}